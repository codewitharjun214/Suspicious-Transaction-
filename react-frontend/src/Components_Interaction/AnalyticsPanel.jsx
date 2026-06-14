import React, { useMemo } from 'react';
import { TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { calculateAddressRiskScore, calculateTransactionRiskScore, getRiskLevel } from '../utils/riskScoring';

export default function AnalyticsPanel({ transactions, addresses = [] }) {
  const analytics = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        volumeByExchange: {},
        volumeByHour: {},
        suspiciousPatterns: [],
        topRiskyAddresses: [],
        totalVolume: 0,
        avgTransactionSize: 0,
        suspiciousCount: 0
      };
    }

    // Volume by exchange
    const volumeByExchange = {};
    transactions.forEach(tx => {
      volumeByExchange[tx.exchange] = (volumeByExchange[tx.exchange] || 0) + tx.amount;
    });

    // Volume by hour
    const volumeByHour = {};
    transactions.forEach(tx => {
      const hour = new Date(tx.timestamp).getHours();
      const key = `${hour}:00`;
      volumeByHour[key] = (volumeByHour[key] || 0) + tx.amount;
    });

    // Suspicious patterns
    const suspiciousPatterns = [];
    const addressCounts = {};
    transactions.forEach(tx => {
      if (tx.suspicious) {
        addressCounts[tx.from] = (addressCounts[tx.from] || 0) + 1;
      }
    });

    Object.entries(addressCounts).forEach(([addr, count]) => {
      if (count > 2) {
        suspiciousPatterns.push({
          address: addr,
          suspiciousCount: count,
          pattern: 'Multiple suspicious transactions'
        });
      }
    });

    // Top risky addresses
    const topRiskyAddresses = [];
    const seenAddresses = new Set();
    
    transactions.forEach(tx => {
      [tx.from, tx.to].forEach(addr => {
        if (!seenAddresses.has(addr)) {
          seenAddresses.add(addr);
          const score = calculateAddressRiskScore(addr, {
            suspiciousCount: transactions.filter(t => t.from === addr && t.suspicious).length,
            transactionFrequency: transactions.filter(t => t.from === addr || t.to === addr).length,
            daysActive: Math.random() * 365
          });
          topRiskyAddresses.push({ address: addr, score });
        }
      });
    });

    topRiskyAddresses.sort((a, b) => b.score - a.score);

    const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgTransactionSize = totalVolume / transactions.length;
    const suspiciousCount = transactions.filter(tx => tx.suspicious).length;

    return {
      volumeByExchange,
      volumeByHour,
      suspiciousPatterns: suspiciousPatterns.slice(0, 5),
      topRiskyAddresses: topRiskyAddresses.slice(0, 5),
      totalVolume,
      avgTransactionSize,
      suspiciousCount
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      {/* Summary Stats */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-400" />
          Analytics Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">Total Volume</span>
            <span className="font-semibold text-yellow-400">${analytics.totalVolume.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">Avg Transaction</span>
            <span className="font-semibold text-blue-400">${analytics.avgTransactionSize.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">Suspicious Txs</span>
            <span className="font-semibold text-red-400">{analytics.suspiciousCount}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-400">Suspicious Rate</span>
            <span className="font-semibold text-orange-400">
              {((analytics.suspiciousCount / (transactions?.length || 1)) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Volume by Exchange */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="text-green-400" />
          Volume by Exchange
        </h3>
        <div className="space-y-2">
          {Object.entries(analytics.volumeByExchange)
            .sort(([, a], [, b]) => b - a)
            .map(([exchange, volume]) => (
              <div key={exchange}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{exchange}</span>
                  <span className="font-semibold text-blue-400">${volume.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded"
                    style={{ width: `${(volume / analytics.totalVolume * 100) || 0}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Suspicious Patterns */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-400" />
          Suspicious Patterns
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {analytics.suspiciousPatterns.length > 0 ? (
            analytics.suspiciousPatterns.map((pattern, idx) => (
              <div key={idx} className="p-2 bg-red-900 bg-opacity-30 rounded border-l-4 border-red-600">
                <div className="text-xs font-semibold text-red-400 mb-1">{pattern.pattern}</div>
                <div className="text-xs text-gray-300 truncate">{pattern.address.slice(0, 20)}...</div>
                <div className="text-xs text-red-300 mt-1">{pattern.suspiciousCount} suspicious txs</div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm">No patterns detected</div>
          )}
        </div>
      </div>

      {/* Top Risky Addresses */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-orange-400" />
          Top Risky Addresses
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {analytics.topRiskyAddresses.length > 0 ? (
            analytics.topRiskyAddresses.map((item, idx) => {
              const riskLevel = getRiskLevel(item.score);
              return (
                <div key={idx} className="p-2 bg-gray-700 rounded">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-xs text-gray-300 truncate flex-grow">{item.address.slice(0, 16)}...</div>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${riskLevel.bg} ${riskLevel.color}`}>
                      {item.score.toFixed(0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded h-1.5">
                    <div
                      className={`h-1.5 rounded transition-all ${item.score >= 75 ? 'bg-red-500' : item.score >= 50 ? 'bg-orange-500' : 'bg-yellow-500'}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-400 text-sm">No addresses analyzed</div>
          )}
        </div>
      </div>
    </div>
  );
}
