'use client';

import { useState, useEffect } from 'react';
import Header from './Components_Interaction/Header'
import Dashboard from './Components_Interaction/Dashboard';
import ExchangeMonitor from './Components_Interaction/ExchangeMonitor';
import EnhancedTransactionLog from './Components_Interaction/EnhancedTransactionLog';
import EnhancedAlertPanel from './Components_Interaction/EnhancedAlertPanel';
import AnalyticsPanel from './Components_Interaction/AnalyticsPanel';
import WatchlistPanel from './Components_Interaction/WatchlistPanel';
import SettingsPanel from './Components_Interaction/SettingsPanel';
import ReportsPanel from './Components_Interaction/ReportsPanel';
import BackgroundEffect from './Components_Interaction/BackgroundEffect';
import { useUserPreferences } from './contexts/UserPreferencesContext';

export default function BlockchainSecurityDashboard() {
  const [exchangeData, setExchangeData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const { autoRefresh, refreshInterval } = useUserPreferences();

  useEffect(() => {
    // Simulate real-time exchange data
    const exchangeInterval = setInterval(() => {
      const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'];
      const newExchangeData = exchanges.map(exchange => ({
        name: exchange,
        transactions: Math.floor(Math.random() * 10000),
        suspicious: Math.floor(Math.random() * 100),
        volume: Math.floor(Math.random() * 1000000),
        status: Math.random() > 0.9 ? 'Alert' : 'Normal',
      }));
      setExchangeData(newExchangeData);
    }, autoRefresh ? refreshInterval : 999999999);

    // Simulate real-time transactions
    const transactionInterval = setInterval(() => {
      const newTransaction = {
        id: Math.random().toString(36).substr(2, 9),
        exchange: ['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'][Math.floor(Math.random() * 5)],
        from: `0x${Math.random().toString(16).substr(2, 40)}`,
        to: `0x${Math.random().toString(16).substr(2, 40)}`,
        amount: Math.random() * 100,
        timestamp: new Date().toISOString(),
        suspicious: Math.random() > 0.85,
        suspiciousReason: Math.random() > 0.85 ? 'High value transaction at unusual time' : undefined
      };
      setTransactions(prev => [...prev.slice(-99), newTransaction]);
    }, 2000);

    // Simulate alerts
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Math.random().toString(36).substr(2, 9),
          exchange: ['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'][Math.floor(Math.random() * 5)],
          message: `Suspicious activity detected on ${['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'][Math.floor(Math.random() * 5)]}`,
          timestamp: new Date().toISOString(),
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)]
        };
        setAlerts(prev => [...prev.slice(-19), newAlert]);
      }
    }, 5000);

    return () => {
      clearInterval(exchangeInterval);
      clearInterval(transactionInterval);
      clearInterval(alertInterval);
    };
  }, [autoRefresh, refreshInterval]);

  // Calculate analytics
  const analytics = {
    totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
    avgTransactionSize: transactions.length > 0 ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length : 0,
    suspiciousCount: transactions.filter(t => t.suspicious).length
  };

  const tabContent = {
    overview: (
      <div className="space-y-8">
        <Dashboard exchangeData={exchangeData} />
        <ExchangeMonitor exchangeData={exchangeData} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EnhancedTransactionLog transactions={transactions} />
          <EnhancedAlertPanel alerts={alerts} />
        </div>
        <AnalyticsPanel transactions={transactions} />
      </div>
    ),
    analytics: (
      <div className="space-y-8">
        <AnalyticsPanel transactions={transactions} />
      </div>
    ),
    watchlist: (
      <div className="space-y-8">
        <WatchlistPanel />
      </div>
    ),
    reports: (
      <div className="space-y-8">
        <ReportsPanel transactions={transactions} analytics={analytics} />
      </div>
    ),
    settings: (
      <div className="space-y-8">
        <SettingsPanel />
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundEffect />
      <Header />
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'analytics', label: '📈 Analytics' },
              { id: 'watchlist', label: '👀 Watchlist' },
              { id: 'reports', label: '📄 Reports' },
              { id: 'settings', label: '⚙️ Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {tabContent[activeTab]}
        </main>
      </div>
    </div>
  );
}