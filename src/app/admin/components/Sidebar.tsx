// components/AdminSidebar.tsx
import { Home, Settings, PlusCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

const menu = [
  { icon: <Home size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: <PlusCircle size={20} />, label: 'Plans', href: '/admin/plans' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      className={clsx(
        'h-full bg-white shadow-md transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-center h-16 font-bold text-[#2d386a]">
        {!collapsed ? 'Admin Panel' : 'A'}
      </div>
      <nav className="flex flex-col gap-2 px-3">
        {menu.map(({ icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
        <button className="flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-100 mt-auto">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}
