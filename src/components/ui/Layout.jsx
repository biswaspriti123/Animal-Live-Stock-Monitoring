import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Auto-close sidebar on mobile when screen size changes
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        // Keep sidebar closed by default on desktop for this design
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <Header onSidebarToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <main className={`
        transition-all duration-300 ease-in-out
        pt-16
        ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-16'}
      `}>
        {children}
      </main>
    </div>
  );
};

export default Layout;