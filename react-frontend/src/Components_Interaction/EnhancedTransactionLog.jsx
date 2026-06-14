import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, Filter, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import TransactionDetailModal from './TransactionDetailModal';
import { exportToCSV } from '../utils/exportUtils';

const ITEMS_PER_PAGE = 10;

export default function EnhancedTransactionLog({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExchange, setFilterExchange] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter transactions
  const filtered = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = !searchTerm || 
        tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.id?.includes(searchTerm);

      const matchesExchange = filterExchange === 'all' || tx.exchange === filterExchange;

      return matchesSearch && matchesExchange;
    });
  }, [transactions, searchTerm, filterExchange]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTxs = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const exchanges = [...new Set(transactions.map(t => t.exchange))];

  const handleExport = () => {
    const exportData = filtered.map(tx => ({
      'Exchange': tx.exchange,
      'From': tx.from,
      'To': tx.to,
      'Amount': tx.amount,
      'Timestamp': new Date(tx.timestamp).toLocaleString(),
      'ID': tx.id
    }));
    exportToCSV(exportData, `transactions-${Date.now()}.csv`);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transaction Log</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-4 space-y-2">
        <div className="flex gap-2">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search address or TX ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterExchange}
              onChange={(e) => {
                setFilterExchange(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Exchanges</option>
              {exchanges.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-400">Showing {paginatedTxs.length} of {filtered.length} transactions</p>
      </div>

      {/* Transaction List */}
      <div className="overflow-y-auto h-80 pr-2 space-y-2">
        {paginatedTxs.length > 0 ? (
          paginatedTxs.map(transaction => (
            <div
              key={transaction.id}
              onClick={() => setSelectedTransaction(transaction)}
              className="mb-2 p-3 bg-gray-700 rounded-lg transform hover:scale-102 hover:bg-gray-600 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-semibold">[{transaction.exchange}]</span>
                <span className="text-xs text-gray-400">{new Date(transaction.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm truncate w-20">{transaction.from.slice(0, 8)}...</span>
                <ArrowRight className="mx-2 text-gray-400" size={16} />
                <span className="text-green-400 text-sm truncate w-20">{transaction.to.slice(0, 8)}...</span>
                <span className="ml-auto text-yellow-400 font-semibold">{transaction.amount.toFixed(2)} ETH</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">No transactions found</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded text-sm transition-colors"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded text-sm transition-colors"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
