import React, { useState } from 'react';
import { X, Copy, ExternalLink, AlertTriangle } from 'lucide-react';
import { calculateAddressRiskScore, getRiskLevel } from '../utils/riskScoring';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

export default function TransactionDetailModal({ transaction, onClose }) {
  const [copied, setCopied] = useState(null);
  const { addToWatchlist } = useUserPreferences();

  if (!transaction) return null;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const riskScore = calculateAddressRiskScore(transaction.from);
  const riskLevel = getRiskLevel(riskScore);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* From Address */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-blue-400">From</h3>
              <div className={`px-3 py-1 rounded text-sm font-semibold ${riskLevel.bg} ${riskLevel.color}`}>
                Risk: {riskScore}/100 ({riskLevel.level})
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-gray-700 p-2 rounded flex-grow text-sm text-green-400 truncate">
                {transaction.from}
              </code>
              <button
                onClick={() => copyToClipboard(transaction.from, 'from')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <Copy size={18} className={copied === 'from' ? 'text-green-400' : 'text-gray-400'} />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                <ExternalLink size={18} className="text-gray-400" />
              </button>
              <button
                onClick={() => addToWatchlist(transaction.from)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                Watch
              </button>
            </div>
          </div>

          {/* To Address */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">To</h3>
            <div className="flex items-center gap-2">
              <code className="bg-gray-700 p-2 rounded flex-grow text-sm text-green-400 truncate">
                {transaction.to}
              </code>
              <button
                onClick={() => copyToClipboard(transaction.to, 'to')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
              >
                <Copy size={18} className={copied === 'to' ? 'text-green-400' : 'text-gray-400'} />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                <ExternalLink size={18} className="text-gray-400" />
              </button>
              <button
                onClick={() => addToWatchlist(transaction.to)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                Watch
              </button>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Amount</p>
              <p className="text-xl font-semibold text-yellow-400">{transaction.amount} ETH</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Exchange</p>
              <p className="text-xl font-semibold text-blue-400">[{transaction.exchange}]</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Timestamp</p>
              <p className="text-sm text-green-400">{new Date(transaction.timestamp).toLocaleString()}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-lg font-semibold text-green-400">Confirmed</p>
            </div>
          </div>

          {/* Additional Metadata */}
          {transaction.suspicious && (
            <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg border-l-4 border-red-500">
              <div className="flex items-start gap-2">
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-400">Suspicious Activity Detected</p>
                  <p className="text-sm text-red-300">{transaction.suspiciousReason}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
