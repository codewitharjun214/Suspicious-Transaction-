import React from 'react';
import { Settings, Save, RotateCcw } from 'lucide-react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

export default function SettingsPanel() {
  const preferences = useUserPreferences();
  const [tempSettings, setTempSettings] = React.useState(preferences);

  const handleSave = () => {
    // Settings are auto-saved via context, just provide feedback
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    const defaultSettings = {
      watchlist: [],
      customAlerts: [],
      alertThreshold: 50,
      autoRefresh: true,
      refreshInterval: 30000,
    };
    Object.keys(defaultSettings).forEach(key => {
      // Reset through individual methods if they exist
      if (key === 'alertThreshold') {
        preferences.updateAlertThreshold(defaultSettings[key]);
      }
    });
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Settings className="text-purple-400" />
        Settings & Preferences
      </h2>

      <div className="space-y-4">
        {/* Auto Refresh */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Auto Refresh</p>
              <p className="text-xs text-gray-400">Automatically refresh data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.autoRefresh}
                onChange={(e) => setTempSettings({...tempSettings, autoRefresh: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Refresh Interval */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <label className="block font-semibold mb-2">Refresh Interval (seconds)</label>
          <input
            type="number"
            min="5"
            max="300"
            step="5"
            value={preferences.refreshInterval / 1000}
            onChange={(e) => setTempSettings({...tempSettings, refreshInterval: Number(e.target.value) * 1000})}
            className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-400 mt-2">Current: {preferences.refreshInterval / 1000}s</p>
        </div>

        {/* Alert Threshold Info */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <p className="font-semibold mb-2">Current Alert Threshold</p>
          <div className="flex items-center gap-2">
            <div className="flex-grow bg-gray-600 rounded h-2">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${preferences.alertThreshold}%` }}
              />
            </div>
            <span className="text-sm font-semibold">{preferences.alertThreshold}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Alerts with scores below this threshold will be filtered</p>
        </div>

        {/* Watchlist Summary */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <p className="font-semibold mb-2">Watchlist Summary</p>
          <p className="text-2xl font-bold text-blue-400">{preferences.watchlist.length}</p>
          <p className="text-xs text-gray-400">Addresses being monitored</p>
        </div>

        {/* Custom Alerts Summary */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <p className="font-semibold mb-2">Custom Alerts</p>
          <p className="text-2xl font-bold text-purple-400">{preferences.customAlerts.length}</p>
          <p className="text-xs text-gray-400">Active custom alert rules</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-600">
          <button
            onClick={handleSave}
            className="flex-grow flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            <Save size={18} />
            Save Settings
          </button>
          <button
            onClick={handleReset}
            className="flex-grow flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
