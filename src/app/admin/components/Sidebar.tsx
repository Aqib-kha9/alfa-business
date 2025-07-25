'use client';

import { Home, Settings, PlusCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { LuWallet } from "react-icons/lu";

const menu = [
  { icon: <Home size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: <LuWallet size={20} />, label: 'Pricing Plans', href: '/admin/plans' },
  { icon: <PlusCircle size={20} />, label: 'Tour Requests', href: '/admin/tour' },
  { icon: <Settings size={20} />, label: 'Amenities', href: '/admin/amenities' },
];

export default function AdminSidebar({
  collapsed,
  onLinkClick,
}: {
  collapsed: boolean;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        'h-full bg-white shadow-md transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-center h-16 font-bold text-[#2d386a]">
        {!collapsed ? 'Admin Panel' : 'A'}
      </div>

      <nav className="flex flex-col gap-2 px-3 flex-grow">
        {menu.map(({ icon, label, href }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              onClick={onLinkClick}
              className={clsx(
                'flex items-center gap-3 p-2 rounded-lg transition',
                isActive
                  ? 'bg-[#2d386a] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {icon}
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={onLinkClick}
        className="flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-100 mx-3 mb-4"
      >
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}
