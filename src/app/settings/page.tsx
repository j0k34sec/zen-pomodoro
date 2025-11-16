'use client';

import { Layout } from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import { useTimer } from '@/hooks/useTimer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Volume2, Bell, Clock, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useTimer();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(localSettings);
  };

  const handleReset = () => {
    const defaultSettings = {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      longBreakInterval: 4,
      autoStartNextSession: false,
      soundEnabled: true,
      soundType: 'bell' as const,
      volume: 0.5,
    };
    setLocalSettings(defaultSettings);
    updateSettings(defaultSettings);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Customize your Pomodoro experience
          </p>
        </div>

        {/* Timer Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Timer Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Duration (minutes)
              </label>
              <Input
                type="number"
                min="1"
                max="60"
                value={localSettings.workDuration}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    workDuration: parseInt(e.target.value) || 25,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Break (minutes)
              </label>
              <Input
                type="number"
                min="1"
                max="30"
                value={localSettings.shortBreakDuration}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    shortBreakDuration: parseInt(e.target.value) || 5,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Break (minutes)
              </label>
              <Input
                type="number"
                min="1"
                max="60"
                value={localSettings.longBreakDuration}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    longBreakDuration: parseInt(e.target.value) || 15,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Break Interval (work sessions)
              </label>
              <Input
                type="number"
                min="2"
                max="10"
                value={localSettings.longBreakInterval}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    longBreakInterval: parseInt(e.target.value) || 4,
                  })
                }
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={localSettings.autoStartNextSession}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    autoStartNextSession: e.target.checked,
                  })
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto-start next session
              </span>
            </label>
          </div>
        </div>

        {/* Sound Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Volume2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sound Settings
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      soundEnabled: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable sound notifications
                </span>
              </label>
            </div>

            {localSettings.soundEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notification Sound
                  </label>
                  <select
                    value={localSettings.soundType}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        soundType: e.target.value as 'bell' | 'chime' | 'gentle' | 'digital',
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="bell">Bell</option>
                    <option value="chime">Chime</option>
                    <option value="gentle">Gentle</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Volume
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={localSettings.volume}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        volume: parseFloat(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>0%</span>
                    <span>{Math.round(localSettings.volume * 100)}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Browser Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enable browser notifications to stay informed even when the tab is in the background.
            </p>

            <Button
              variant="outline"
              onClick={() => {
                if ('Notification' in window) {
                  Notification.requestPermission();
                }
              }}
            >
              Enable Browser Notifications
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Button onClick={handleSave} className="flex-1 md:flex-none">
            Save Settings
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
        </div>
      </div>
    </Layout>
  );
}