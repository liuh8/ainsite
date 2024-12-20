import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="bg-background fixed w-full z-10 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-foreground">
              AinSite
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive('/projects') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-primary-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/projects') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;