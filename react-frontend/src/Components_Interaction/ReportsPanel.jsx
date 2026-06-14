import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import { exportToCSV, generateReport } from '../utils/exportUtils';

export default function ReportsPanel({ transactions, analytics }) {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('7days');

  const handleGenerateReport = () => {
    if (reportType === 'summary') {
      const report = {
        title: 'Transaction Summary Report',
        timestamp: new Date().toLocaleString(),
        summary: {
          'Total Transactions': transactions?.length || 0,
          'Total Volume': `$${(analytics?.totalVolume || 0).toFixed(2)}`,
          'Average Transaction': `$${(analytics?.avgTransactionSize || 0).toFixed(2)}`,
          'Suspicious Activities': analytics?.suspiciousCount || 0,
          'Suspicious Rate': `${((analytics?.suspiciousCount || 0) / (transactions?.length || 1) * 100).toFixed(1)}%`
        },
        details: transactions?.slice(0, 100).map(t => ({
          Exchange: t.exchange,
          From: t.from,
          To: t.to,
          Amount: t.amount,
          Timestamp: new Date(t.timestamp).toLocaleString()
        })) || []
      };
      generateReport(report, 'Transaction-Summary');
    } else if (reportType === 'suspicious') {
      const suspiciousTxs = transactions?.filter(t => t.suspicious) || [];
      const report = {
        title: 'Suspicious Activity Report',
        timestamp: new Date().toLocaleString(),
        summary: {
          'Total Suspicious': suspiciousTxs.length,
          'Percentage': `${((suspiciousTxs.length / (transactions?.length || 1)) * 100).toFixed(1)}%`,
          'Date Range': dateRange
        },
        details: suspiciousTxs.map(t => ({
          Exchange: t.exchange,
          From: t.from,
          To: t.to,
          Amount: t.amount,
          Reason: t.suspiciousReason || 'N/A',
          Timestamp: new Date(t.timestamp).toLocaleString()
        }))
      };
      generateReport(report, 'Suspicious-Activity');
    } else if (reportType === 'volume') {
      const volumeData = {};
      transactions?.forEach(t => {
        volumeData[t.exchange] = (volumeData[t.exchange] || 0) + t.amount;
      });
      const report = {
        title: 'Volume Analysis Report',
        timestamp: new Date().toLocaleString(),
        summary: {
          'Total Volume': `$${(analytics?.totalVolume || 0).toFixed(2)}`,
          'Exchanges': Object.keys(volumeData).length,
          'Period': dateRange
        },
        details: Object.entries(volumeData).map(([ex, vol]) => ({
          Exchange: ex,
          Volume: `$${vol.toFixed(2)}`,
          Percentage: `${((vol / (analytics?.totalVolume || 1)) * 100).toFixed(1)}%`
        }))
      };
      generateReport(report, 'Volume-Analysis');
    }
  };

  const handleExportTransactions = () => {
    const suspiciousTxs = transactions?.filter(t => t.suspicious) || [];
    const exportData = suspiciousTxs.map(t => ({
      'Exchange': t.exchange,
      'From': t.from,
      'To': t.to,
      'Amount': t.amount,
      'Timestamp': new Date(t.timestamp).toLocaleString(),
      'Reason': t.suspiciousReason || 'N/A'
    }));
    exportToCSV(exportData, `suspicious-transactions-${Date.now()}.csv`);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="text-green-400" />
        Reports & Export
      </h2>

      <div className="space-y-4">
        {/* Report Type Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="summary">Transaction Summary</option>
            <option value="suspicious">Suspicious Activity</option>
            <option value="volume">Volume Analysis</option>
          </select>
        </div>

        {/* Date Range Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-1">
            <Calendar size={16} />
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="alltime">All Time</option>
          </select>
        </div>

        {/* Report Description */}
        <div className="p-3 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300">
            {reportType === 'summary' && 'Generate a comprehensive summary of all transactions with key metrics and statistics.'}
            {reportType === 'suspicious' && 'Generate a detailed report of all suspicious activities detected during the selected period.'}
            {reportType === 'volume' && 'Generate an analysis of trading volumes by exchange and time period.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleGenerateReport}
            className="flex-grow flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors font-semibold"
          >
            <Download size={18} />
            Generate Report
          </button>
          <button
            onClick={handleExportTransactions}
            className="flex-grow flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors font-semibold"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Quick Stats */}
        <div className="p-3 bg-gray-700 rounded-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Quick Statistics</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{transactions?.length || 0}</p>
            </div>
            <TrendingUp className="text-green-400" size={32} />
          </div>
          <p className="text-xs text-gray-400 mt-2">Total transactions available for reporting</p>
        </div>
      </div>
    </div>
  );
}
