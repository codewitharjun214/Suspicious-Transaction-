import React, { useState } from 'react';
import { Trash2, Plus, TrendingUp, AlertTriangle } from 'lucide-react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { calculateAddressRiskScore, getRiskLevel } from '../utils/riskScoring';

export default function WatchlistPanel() {
  const { watchlist, removeFromWatchlist, addToWatchlist } = useUserPreferences();
  const [newAddress, setNewAddress] = useState('');
  const [addressData] = useState({});

  const handleAdd = () => {
    if (newAddress.trim() && newAddress.startsWith('0x')) {
      addToWatchlist(newAddress.trim());
      setNewAddress('');
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="text-blue-400" />
        Watchlist
      </h2>

      {/* Add Address Form */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Enter wallet address (0x...)"
          className="flex-grow px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* Watchlist Items */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {watchlist.length > 0 ? (
          watchlist.map((address, idx) => {
            const riskScore = calculateAddressRiskScore(address, addressData[address] || {});
            const riskLevel = getRiskLevel(riskScore);
            
            return (
              <div key={idx} className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="font-mono text-sm text-blue-400 mb-1 truncate">{address}</div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${riskLevel.bg} ${riskLevel.color}`}>
                        Risk: {riskScore.toFixed(0)}/100
                      </div>
                      <span className="text-xs text-gray-400">{riskLevel.level}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromWatchlist(address)}
                    className="p-2 hover:bg-red-600 hover:bg-opacity-30 rounded transition-colors text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-400">
            <AlertTriangle className="mx-auto mb-2 opacity-50" />
            <p>No addresses in watchlist</p>
            <p className="text-xs">Add addresses to monitor them</p>
          </div>
        )}
      </div>
    </div>
  );
}
