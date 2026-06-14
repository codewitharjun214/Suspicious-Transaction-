import { Search, Bell } from 'lucide-react';
import {useState} from 'react';
import {Link} from "react-router-dom";


export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  return (
  <>
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md py-3 sm:py-4 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 flex items-center">
              <span className="mr-1 sm:mr-2">🛡️</span>
              CryptoMapAI
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="https://intel.arkm.com/visualizer/entity/m/visualizer">
              <button className="bg-green-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-black font-medium text-sm sm:text-base hover:bg-red-400 transition-colors duration-300 whitespace-nowrap">
                Investigate Wallet
              </button>
            </Link>
            <Link to="/eth">
              <button className="bg-blue-500 px-4 sm:px-5 py-2 sm:py-3 rounded-full text-white font-medium text-sm sm:text-base hover:bg-blue-600 transition-colors duration-300 whitespace-nowrap">
                Live Graph
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-green-400 flex items-center">
              <span className="mr-1">🛡️</span>
              <span className="hidden sm:inline">CryptoMapAI</span>
              <span className="sm:hidden">CryptoMap</span>
            </h1>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
            <Link to="https://intel.arkm.com/visualizer/entity/m/visualizer" className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto bg-green-300 px-3 sm:px-4 py-2 rounded-full text-black font-medium text-sm hover:bg-red-400 transition-colors duration-300 truncate">
                Investigate Wallet
              </button>
            </Link>
            <Link to="/eth" className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto bg-blue-500 px-3 sm:px-4 py-2 rounded-full text-white font-medium text-sm hover:bg-blue-600 transition-colors duration-300">
                Live Graph
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  </>
  );
}
