import React, { useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 p-1 rounded-md"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="ml-4 flex items-center">
            <div className="text-xl font-semibold text-teal-700">
              <span className="hidden md:inline">WhatsApp</span> Campaign Hub
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className={`relative rounded-md shadow-sm transition-all duration-200 ${searchFocused ? 'ring-2 ring-teal-500' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 pl-10 py-2 focus:border-teal-500 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search campaigns, contacts..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 p-1 rounded-md relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium">
            JS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;