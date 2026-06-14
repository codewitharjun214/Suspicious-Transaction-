import React, { createContext, useState, useEffect } from 'react';

export const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    watchlist: [],
    customAlerts: [],
    alertThreshold: 50,
    darkMode: true,
    autoRefresh: true,
    refreshInterval: 30000, // 30 seconds
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const addToWatchlist = (address) => {
    if (!preferences.watchlist.includes(address)) {
      setPreferences(prev => ({
        ...prev,
        watchlist: [...prev.watchlist, address]
      }));
    }
  };

  const removeFromWatchlist = (address) => {
    setPreferences(prev => ({
      ...prev,
      watchlist: prev.watchlist.filter(a => a !== address)
    }));
  };

  const addCustomAlert = (alert) => {
    setPreferences(prev => ({
      ...prev,
      customAlerts: [...prev.customAlerts, { ...alert, id: Date.now() }]
    }));
  };

  const removeCustomAlert = (alertId) => {
    setPreferences(prev => ({
      ...prev,
      customAlerts: prev.customAlerts.filter(a => a.id !== alertId)
    }));
  };

  const updateAlertThreshold = (threshold) => {
    setPreferences(prev => ({ ...prev, alertThreshold: threshold }));
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        ...preferences,
        addToWatchlist,
        removeFromWatchlist,
        addCustomAlert,
        removeCustomAlert,
        updateAlertThreshold,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = React.useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  }
  return context;
};
