"use client";

import { useState, useEffect } from "react";
import { useConfig, useUpdateConfig } from "@/services/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Clock, Plus, X, Save, Loader2 } from "lucide-react";
import type { Config, TimeWindow } from "@/lib/api";

export default function DashboardPage() {
  // React Query hooks
  const { data: config, isLoading, error } = useConfig();
  const updateConfigMutation = useUpdateConfig();

  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newNumber, setNewNumber] = useState("");
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [timezone, setTimezone] = useState("America/New_York");
  const [allowedTimes, setAllowedTimes] = useState<TimeWindow[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize form state when config loads
  useEffect(() => {
    if (config) {
      setWhitelist(config.whitelist || []);
      setScheduleEnabled(config.schedule?.enabled ?? true);
      setTimezone(config.schedule?.timezone || "America/New_York");
      setAllowedTimes(config.schedule?.allowedTimes || []);
    }
  }, [config]);

  const handleAddNumber = () => {
    if (newNumber.trim() && !whitelist.includes(newNumber.trim())) {
      setWhitelist([...whitelist, newNumber.trim()]);
      setNewNumber("");
    }
  };

  const handleRemoveNumber = (number: string) => {
    setWhitelist(whitelist.filter((n) => n !== number));
  };

  const handleAddTimeWindow = () => {
    setAllowedTimes([
      ...allowedTimes,
      {
        dayOfWeek: [1, 2, 3, 4, 5],
        startTime: "09:00",
        endTime: "17:00",
      },
    ]);
  };

  const handleRemoveTimeWindow = (index: number) => {
    setAllowedTimes(allowedTimes.filter((_, i) => i !== index));
  };

  const handleUpdateTimeWindow = (
    index: number,
    field: keyof TimeWindow,
    value: unknown
  ) => {
    const updated = [...allowedTimes];
    updated[index] = { ...updated[index]!, [field]: value };
    setAllowedTimes(updated);
  };

  const handleSave = async () => {
    setSuccessMessage("");
    try {
      const updatedConfig: Config = {
        whitelist,
        schedule: {
          enabled: scheduleEnabled,
          timezone,
          allowedTimes,
        },
      };
      await updateConfigMutation.mutateAsync(updatedConfig);
      setSuccessMessage("Configuration saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      // Error is shown in error state
    }
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your call filtering whitelist and schedule settings
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error instanceof Error ? error.message : "Failed to load config"}
        </div>
      )}

      {updateConfigMutation.error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {updateConfigMutation.error instanceof Error
            ? updateConfigMutation.error.message
            : "Failed to save config"}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md border border-green-200">
          {successMessage}
        </div>
      )}

      {/* Whitelist Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Whitelist Management
          </CardTitle>
          <CardDescription>
            Phone numbers on the whitelist are always allowed to call,
            regardless of schedule settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="+1234567890"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddNumber()}
            />
            <Button onClick={handleAddNumber} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {whitelist.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No numbers in whitelist. Add one above.
            </p>
          ) : (
            <div className="space-y-2">
              {whitelist.map((number) => (
                <div
                  key={number}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-md"
                >
                  <span className="font-mono">{number}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveNumber(number)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Schedule Settings
          </CardTitle>
          <CardDescription>
            Configure when calls should be accepted (for non-whitelisted
            numbers).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="schedule-enabled"
              checked={scheduleEnabled}
              onChange={(e) => setScheduleEnabled(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="schedule-enabled">Enable schedule filtering</Label>
          </div>

          {scheduleEnabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="America/New_York"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Allowed Time Windows</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddTimeWindow}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Window
                  </Button>
                </div>

                {allowedTimes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No time windows configured. Add one above.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {allowedTimes.map((window, index) => (
                      <div
                        key={index}
                        className="p-4 bg-secondary/50 rounded-md space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <Label className="text-sm font-semibold">
                            Window {index + 1}
                          </Label>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTimeWindow(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div>
                          <Label className="text-sm mb-2 block">Days</Label>
                          <div className="flex gap-1">
                            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => {
                                  const days = window.dayOfWeek.includes(day)
                                    ? window.dayOfWeek.filter((d) => d !== day)
                                    : [...window.dayOfWeek, day].sort();
                                  handleUpdateTimeWindow(
                                    index,
                                    "dayOfWeek",
                                    days
                                  );
                                }}
                                className={`px-2 py-1 text-xs rounded ${
                                  window.dayOfWeek.includes(day)
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background border"
                                }`}
                              >
                                {dayNames[day]}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm">Start Time</Label>
                            <Input
                              type="time"
                              value={window.startTime}
                              onChange={(e) =>
                                handleUpdateTimeWindow(
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-sm">End Time</Label>
                            <Input
                              type="time"
                              value={window.endTime}
                              onChange={(e) =>
                                handleUpdateTimeWindow(
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updateConfigMutation.isPending || isLoading}
          size="lg"
          className="w-full sm:w-auto"
        >
          {updateConfigMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
