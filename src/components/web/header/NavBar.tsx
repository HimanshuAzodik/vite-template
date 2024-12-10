import { useState } from 'react';
import { Image } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Button } from '@/components/ui/button';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="h-full w-32 flex justify-center items-center">
            <Image src="/src/assets/logo.svg" alt="Azodik" className="dark:white" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                         transition-colors duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                       text-white shadow-sm transition-all duration-200"
              >
                Sign Up
              </Button>
              <ColorSchemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 
                         dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 
                         transition-colors duration-200 rounded-md"
              >
                {item}
              </a>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 space-y-2">
              <Button
                variant="ghost"
                className="w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300
                         hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Button>
              <Button
                className="w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 
                         dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
