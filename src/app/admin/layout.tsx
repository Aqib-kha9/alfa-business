'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './components/Sidebar';
import AdminNavbar from './components/Topbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile after clicking a link
  const handleCloseSidebar = () => {
    if (isMobile) setCollapsed(false);
  };

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 relative">
      {/* Top Navbar */}
      <AdminNavbar toggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
            <AdminSidebar collapsed={collapsed} />
          </div>
        )}

        {/* Mobile Sidebar - overlays when collapsed = true */}
        {isMobile && collapsed && (
          <div className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg">
            <AdminSidebar collapsed={false} onLinkClick={handleCloseSidebar} />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
