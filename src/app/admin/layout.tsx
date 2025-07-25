// components/AdminLayout.tsx
'use client';
import { useState } from 'react';
import AdminSidebar from './components/Sidebar';
import AdminNavbar from './components/Topbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col">
        <AdminNavbar toggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
