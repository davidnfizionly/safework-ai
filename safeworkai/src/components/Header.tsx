import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-blue-800" />
              <span className="ml-2 text-xl font-bold text-gray-900">SafeWork AI</span>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="text-blue-900 font-medium border-b-2 border-blue-500 px-1 pt-1 pb-2">
                Dashboard
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 font-medium px-1 pt-1 pb-2">
                Reports
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 font-medium px-1 pt-1 pb-2">
                Analytics
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 font-medium px-1 pt-1 pb-2">
                Settings
              </a>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            <button className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              New Analysis
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <a href="#" className="bg-blue-50 border-l-4 border-blue-500 text-blue-900 block pl-3 pr-4 py-2 text-base font-medium">
            Dashboard
          </a>
          <a href="#" className="border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium text-gray-500">
            Reports
          </a>
          <a href="#" className="border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium text-gray-500">
            Analytics
          </a>
          <a href="#" className="border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium text-gray-500">
            Settings
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <button className="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              New Analysis
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;