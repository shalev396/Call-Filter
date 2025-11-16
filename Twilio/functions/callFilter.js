/**
 * Call Filter Handler
 * 
 * This function is called by Twilio Studio Flow when an incoming call is received.
 * It checks if the caller should be allowed based on:
 * 1. Whitelist - Always allow if number is whitelisted
 * 2. Schedule - Check if current time falls within allowed schedule
 * 
 * Returns: JSON response with "forward" boolean
 */

// Helper function to parse time (HH:MM format)
function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes; // Convert to minutes since midnight
}

// Helper function to get current time in timezone
function getCurrentTimeInTimezone(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'long',
  });
  
  const parts = formatter.formatToParts(now);
  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  const weekday = parts.find(p => p.type === 'weekday').value;
  
  const dayMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
  };
  
  return {
    currentMinutes: parseInt(hour) * 60 + parseInt(minute),
    dayOfWeek: dayMap[weekday],
  };
}

// Main handler
exports.handler = async function(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  
  try {
    // Get caller's phone number
    const callerNumber = event.From;
    console.log('Incoming call from:', callerNumber);
    
    // Load configuration from Assets
    // Note: In Twilio Functions, Assets are accessible via Runtime.getAssets()
    // For this example, we'll use a hardcoded config structure
    // In production, you would load from Twilio Assets API or use environment variables
    
    const config = {
      whitelist: JSON.parse(context.WHITELIST || '[]'),
      schedule: JSON.parse(context.SCHEDULE_CONFIG || '{"enabled":false}'),
    };
    
    console.log('Config loaded:', JSON.stringify(config));
    
    // Check whitelist first - always allow if whitelisted
    const isWhitelisted = config.whitelist.includes(callerNumber);
    if (isWhitelisted) {
      console.log('Number is whitelisted - forwarding call');
      response.setBody({ forward: true, reason: 'whitelisted' });
      return callback(null, response);
    }
    
    // Check schedule if enabled
    if (config.schedule.enabled) {
      const { currentMinutes, dayOfWeek } = getCurrentTimeInTimezone(
        config.schedule.timezone || 'America/New_York'
      );
      
      console.log('Current time:', currentMinutes, 'minutes, Day:', dayOfWeek);
      
      // Check if current time falls within any allowed time window
      const isWithinSchedule = config.schedule.allowedTimes.some(window => {
        const isAllowedDay = window.dayOfWeek.includes(dayOfWeek);
        const startMinutes = parseTime(window.startTime);
        const endMinutes = parseTime(window.endTime);
        const isWithinTime = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
        
        console.log(`Checking window: Days ${window.dayOfWeek}, ${window.startTime}-${window.endTime}`);
        console.log(`  Is allowed day: ${isAllowedDay}, Is within time: ${isWithinTime}`);
        
        return isAllowedDay && isWithinTime;
      });
      
      if (isWithinSchedule) {
        console.log('Within schedule - forwarding call');
        response.setBody({ forward: true, reason: 'within_schedule' });
      } else {
        console.log('Outside schedule - rejecting call');
        response.setBody({ forward: false, reason: 'outside_schedule' });
      }
    } else {
      // Schedule not enabled - reject by default
      console.log('Schedule filtering disabled - rejecting call');
      response.setBody({ forward: false, reason: 'schedule_disabled' });
    }
    
    return callback(null, response);
    
  } catch (error) {
    console.error('Error in call filter:', error);
    response.setStatusCode(500);
    response.setBody({ error: error.message });
    return callback(null, response);
  }
};

