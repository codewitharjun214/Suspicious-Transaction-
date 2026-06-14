import React, { useState, useMemo } from 'react';
import { AlertCircle, X, Bell, Filter, Trash2 } from 'lucide-react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

export default function EnhancedAlertPanel({ alerts }) {
  const [filterExchange, setFilterExchange] = useState('all');
  const [showCustomAlertForm, setShowCustomAlertForm] = useState(false);
  const [customAlertForm, setCustomAlertForm] = useState({
    address: '',
    condition: 'amount_threshold',
    value: 10
  });
  const { 
    customAlerts, 
    addCustomAlert, 
    removeCustomAlert, 
    alertThreshold,
    updateAlertThreshold 
  } = useUserPreferences();

  // Filter alerts
  const filtered = useMemo(() => {
    return alerts.filter(alert => {
      const matchesExchange = filterExchange === 'all' || alert.exchange === filterExchange;
      return matchesExchange;
    });
  }, [alerts, filterExchange]);

  const exchanges = [...new Set(alerts.map(a => a.exchange))];

  const handleAddCustomAlert = (e) => {
    e.preventDefault();
    if (customAlertForm.address.trim()) {
      addCustomAlert(customAlertForm);
      setCustomAlertForm({ address: '', condition: 'amount_threshold', value: 10 });
      setShowCustomAlertForm(false);
    }
  };

  const getSeverityColor = (severity = 'medium') => {
    switch (severity) {
      case 'critical': return 'border-l-4 border-red-600 bg-red-900 bg-opacity-30';
      case 'high': return 'border-l-4 border-orange-600 bg-orange-900 bg-opacity-30';
      default: return 'border-l-4 border-yellow-600 bg-yellow-900 bg-opacity-30';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <AlertCircle className="mr-2 text-red-400" />
          Alert Panel
        </h2>
        <button
          onClick={() => setShowCustomAlertForm(!showCustomAlertForm)}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
        >
          <Bell size={16} />
          Custom Alert
        </button>
      </div>

      {/* Custom Alert Form */}
      {showCustomAlertForm && (
        <form onSubmit={handleAddCustomAlert} className="mb-4 p-4 bg-gray-700 rounded-lg">
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300">Address to Watch</label>
              <input
                type="text"
                value={customAlertForm.address}
                onChange={(e) => setCustomAlertForm({...customAlertForm, address: e.target.value})}
                placeholder="0x..."
                className="w-full mt-1 px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-300">Condition</label>
                <select
                  value={customAlertForm.condition}
                  onChange={(e) => setCustomAlertForm({...customAlertForm, condition: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="amount_threshold">Amount Threshold</option>
                  <option value="frequency">Transaction Frequency</option>
                  <option value="entity_type">Entity Type</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300">Value</label>
                <input
                  type="number"
                  value={customAlertForm.value}
                  onChange={(e) => setCustomAlertForm({...customAlertForm, value: Number(e.target.value)})}
                  className="w-full mt-1 px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowCustomAlertForm(false)}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                Add Alert
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Alert Threshold Slider */}
      <div className="mb-4 p-3 bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-gray-300">Alert Threshold: {alertThreshold}/100</label>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={alertThreshold}
          onChange={(e) => updateAlertThreshold(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Filter Controls */}
      <div className="mb-4 flex items-center gap-2">
        <Filter size={18} className="text-gray-400" />
        <select
          value={filterExchange}
          onChange={(e) => setFilterExchange(e.target.value)}
          className="px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Exchanges</option>
          {exchanges.map(ex => (
            <option key={ex} value={ex}>{ex}</option>
          ))}
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-2 overflow-y-auto h-80 pr-2">
        {/* System Alerts */}
        {filtered.length > 0 ? (
          filtered.map(alert => (
            <div key={alert.id} className={`p-3 rounded-lg flex items-start transform hover:scale-102 transition-all duration-200 ${getSeverityColor(alert.severity)}`}>
              <AlertCircle className="mr-2 text-red-400 flex-shrink-0 mt-1" size={18} />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <p className="text-sm">
                    <span className="text-blue-400 font-semibold">[{alert.exchange}]</span> {alert.message}
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">No active alerts</div>
        )}

        {/* Custom Alerts */}
        {customAlerts.length > 0 && (
          <>
            <div className="text-xs font-semibold text-gray-400 mt-4 mb-2">Custom Alerts</div>
            {customAlerts.map(customAlert => (
              <div key={customAlert.id} className="p-3 rounded-lg bg-blue-900 bg-opacity-30 border-l-4 border-blue-600 flex items-start">
                <Bell className="mr-2 text-blue-400 flex-shrink-0 mt-1" size={18} />
                <div className="flex-grow">
                  <p className="text-sm">
                    <span className="font-semibold">{customAlert.condition}</span>: {customAlert.address.slice(0, 10)}... = {customAlert.value}
                  </p>
                </div>
                <button
                  onClick={() => removeCustomAlert(customAlert.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
