// Risk scoring algorithm for addresses and transactions
export const calculateAddressRiskScore = (address, addressData = {}) => {
  let score = 0;

  // Factor 1: Number of suspicious transactions (0-30 points)
  const suspiciousCount = addressData.suspiciousCount || 0;
  score += Math.min(suspiciousCount * 2, 30);

  // Factor 2: Transaction frequency (0-20 points)
  const txFrequency = addressData.transactionFrequency || 0;
  score += Math.min(txFrequency / 10, 20);

  // Factor 3: Time active (0-15 points)
  const daysActive = addressData.daysActive || 0;
  if (daysActive < 7) score += 15; // New address = higher risk
  else if (daysActive < 30) score += 10;
  else if (daysActive < 90) score += 5;

  // Factor 4: Entity classification (0-35 points)
  const entityType = addressData.entityType || 'unknown';
  const riskMap = {
    'unknown': 35,
    'mixer': 35,
    'ransomware': 35,
    'hacker': 30,
    'scam': 30,
    'exchange': 0,
    'contract': 5,
    'user': 5
  };
  score += riskMap[entityType] || 20;

  return Math.min(score, 100);
};

export const calculateTransactionRiskScore = (transaction) => {
  let score = 0;

  // Factor 1: Amount unusually high (0-25 points)
  if (transaction.amount > transaction.averageAmount * 5) {
    score += 25;
  } else if (transaction.amount > transaction.averageAmount * 2) {
    score += 15;
  }

  // Factor 2: Time of transaction (0-20 points)
  const hour = new Date(transaction.timestamp).getHours();
  if (hour >= 22 || hour <= 4) {
    score += 20; // Off-hours transactions
  }

  // Factor 3: Private/mixer involvement (0-35 points)
  if (transaction.toPrivate || transaction.fromPrivate) {
    score += 35;
  } else if (transaction.toMixer || transaction.fromMixer) {
    score += 30;
  }

  // Factor 4: Speed (0-20 points)
  if (transaction.speedMs < 1000) {
    score += 20; // Very fast execution
  }

  return Math.min(score, 100);
};

export const getRiskLevel = (score) => {
  if (score >= 75) return { level: 'Critical', color: 'text-red-600', bg: 'bg-red-100' };
  if (score >= 50) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-100' };
  if (score >= 25) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
};
