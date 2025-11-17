/**
 * Call Filter Function - Checks if incoming call should be forwarded
 * Loads from Assets (/whitelist.json and /schedule.json)
 */

// ===== Israel DST helpers =====
function lastSunday(year, month) {
  const d = new Date(Date.UTC(year, month + 1, 0, 12));
  const day = d.getUTCDay();
  d.setUTCDate(d.getUTCDate() - day);
  return d.getUTCDate();
}

function fridayBeforeLastSundayOfMarch(year) {
  const lastSun = lastSunday(year, 2);
  const sunday = new Date(Date.UTC(year, 2, lastSun, 12));
  const friday = new Date(sunday.getTime() - 2 * 24 * 3600 * 1000);
  return friday.getUTCDate();
}

function israelDstBoundariesUtc(year) {
  const startDay = fridayBeforeLastSundayOfMarch(year);
  const endDay = lastSunday(year, 9);
  const startUtc = new Date(Date.UTC(year, 2, startDay, 0, 0, 0));
  const endUtc = new Date(
    Date.UTC(year, 9, endDay, 23, 0, 0) - 24 * 3600 * 1000
  );
  return { startUtc, endUtc };
}

function isIsraelDST(dateUtc) {
  const { startUtc, endUtc } = israelDstBoundariesUtc(dateUtc.getUTCFullYear());
  return dateUtc >= startUtc && dateUtc < endUtc;
}

function israelUtcOffsetHours(dateUtc) {
  return isIsraelDST(dateUtc) ? 3 : 2;
}

function israelLocalHourToUtcHour(localHour, dateUtc) {
  const offset = israelUtcOffsetHours(dateUtc);
  let utcHour = (localHour - offset) % 24;
  if (utcHour < 0) utcHour += 24;
  return utcHour;
}

function isUtcHourInWindow(currentUtcHour, fromUtcHour, toUtcHour) {
  if (fromUtcHour === toUtcHour) return true;
  if (fromUtcHour < toUtcHour)
    return currentUtcHour >= fromUtcHour && currentUtcHour < toUtcHour;
  return currentUtcHour >= fromUtcHour || currentUtcHour < toUtcHour;
}

function parseTimeWindow(window, nowUtc) {
  const [startH] = window.start.split(":").map(Number);
  const [endH] = window.end.split(":").map(Number);
  const fromUtcHour = israelLocalHourToUtcHour(startH, nowUtc);
  const toUtcHour = israelLocalHourToUtcHour(endH, nowUtc);
  return { fromUtcHour, toUtcHour };
}

// ===== Load config from assets =====
function loadConfig() {
  let whitelist, schedule;

  // Load whitelist from asset
  const openWhitelist = Runtime.getAssets()["/whitelist.json"].open;
  const whitelistContent = openWhitelist();
  whitelist = JSON.parse(whitelistContent);

  // Load schedule from asset
  const openSchedule = Runtime.getAssets()["/schedule.json"].open;
  const scheduleContent = openSchedule();
  schedule = JSON.parse(scheduleContent);

  return { whitelist, schedule };
}

// ===== Main Handler =====
exports.handler = async function (_context, event, callback) {
  const nowUtc = new Date();
  const caller = event.From || event.from || "";

  console.log("=".repeat(50));
  console.log(`[Call Filter] ${nowUtc.toISOString()}`);
  console.log(`[Call Filter] Incoming call from: ${caller}`);
  console.log("=".repeat(50));

  try {
    if (!caller) {
      throw new Error("Missing caller number");
    }

    // Load config (from assets)
    const { whitelist, schedule } = loadConfig();

    // Check whitelist first (always forward if whitelisted)
    const isWhitelisted = whitelist.some((w) => w.number === caller);

    console.log(`[Call Filter] Checking whitelist...`);
    if (isWhitelisted) {
      console.log(`[Call Filter] ✓ Number IS in whitelist`);
      console.log(`[Call Filter] DECISION: FORWARD CALL`);
      const response = new Twilio.Response();
      response.appendHeader("Content-Type", "application/json");
      response.setStatusCode(200);
      response.setBody({
        allow: true,
        reason: "whitelist",
        caller,
      });
      return callback(null, response);
    }

    console.log(`[Call Filter] ✗ Number NOT in whitelist`);
    console.log(`[Call Filter] Checking schedule...`);

    // Check schedule if not whitelisted
    if (!schedule.enabled) {
      console.log("[Call Filter] ✗ Schedule DISABLED");
      console.log(`[Call Filter] DECISION: DENY CALL`);
      const response = new Twilio.Response();
      response.appendHeader("Content-Type", "application/json");
      response.setStatusCode(403);
      response.setBody({
        allow: false,
        reason: "schedule_disabled",
      });
      return callback(null, response);
    }

    const currentUtcHour = nowUtc.getUTCHours();
    const dayOfWeek = nowUtc.getUTCDay();
    const daySchedule = schedule.days.find((d) => d.day === dayOfWeek);

    if (!daySchedule || !daySchedule.windows.length) {
      console.log(
        `[Call Filter] ✗ No windows for today (${daySchedule?.name || "day"})`
      );
      console.log(`[Call Filter] DECISION: DENY CALL`);
      const response = new Twilio.Response();
      response.appendHeader("Content-Type", "application/json");
      response.setStatusCode(403);
      response.setBody({
        allow: false,
        reason: "no_windows",
      });
      return callback(null, response);
    }

    // Check if current time is in any window
    let inWindow = false;
    for (const window of daySchedule.windows) {
      const { fromUtcHour, toUtcHour } = parseTimeWindow(window, nowUtc);
      if (isUtcHourInWindow(currentUtcHour, fromUtcHour, toUtcHour)) {
        inWindow = true;
        break;
      }
    }

    if (inWindow) {
      console.log(`[Call Filter] ✓ Inside time window`);
      console.log(`[Call Filter] DECISION: FORWARD CALL`);
      const response = new Twilio.Response();
      response.appendHeader("Content-Type", "application/json");
      response.setStatusCode(200);
      response.setBody({
        allow: true,
        reason: "in_schedule",
        caller,
      });
      return callback(null, response);
    } else {
      console.log(`[Call Filter] ✗ Outside time window`);
      console.log(`[Call Filter] DECISION: DENY CALL`);
      const response = new Twilio.Response();
      response.appendHeader("Content-Type", "application/json");
      response.setStatusCode(403);
      response.setBody({
        allow: false,
        reason: "outside_hours",
      });
      return callback(null, response);
    }
  } catch (err) {
    console.error("[Call Filter] ✗✗✗ ERROR:", err.message);
    console.error(err.stack);
    const response = new Twilio.Response();
    response.appendHeader("Content-Type", "application/json");
    response.setStatusCode(403);
    response.setBody({
      allow: false,
      reason: "error",
      message: err.message || "Unhandled error",
    });
    return callback(null, response);
  }
};
