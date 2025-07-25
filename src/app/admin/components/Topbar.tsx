// components/AdminNavbar.tsx
import { Menu } from 'lucide-react';

export default function AdminNavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="h-16 px-4 flex items-center bg-white shadow-sm">
      <button
        onClick={toggleSidebar}
        className="text-gray-700 hover:text-[#2d386a] p-2"
      >
        <Menu size={24} />
      </button>
      <h1 className="ml-4 text-xl font-semibold text-[#2d386a]">Dashboard</h1>
    </header>
  );
}
