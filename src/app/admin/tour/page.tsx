'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import clsx from 'clsx';
import ActionMenu from '../components/ActionMenu'; // ✅ Make sure this path is correct
import { useRouter } from 'next/navigation';

const tabs = ['All Requests', 'Pending', 'Approved'];

const mockData = [
  {
    id: 'TR001',
    name: 'Alice Wonderland',
    email: 'alice.w@example.com',
    phone: '555-123-4567',
    date: '2024-07-20',
    time: '10:00 AM',
    status: 'Pending',
  },
  {
    id: 'TR002',
    name: 'Bob The Builder',
    email: 'bob.b@example.com',
    phone: '555-987-6543',
    date: '2024-07-22',
    time: '02:30 PM',
    status: 'Approved',
  },
];

export default function TourRequestsPage() {
  const [selectedTab, setSelectedTab] = useState('All Requests');
  const router = useRouter();
  const filteredData =
    selectedTab === 'All Requests'
      ? mockData
      : mockData.filter((d) => d.status === selectedTab);

  return (
    <div className=" p-6 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#2d386a]">Tour Requests</h2>
          <p className="text-sm text-gray-500">
            Efficiently manage and track all incoming tour inquiries.
          </p>
        </div>
        
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={clsx(
              'px-2 py-1 rounded-md border font-medium text-sm',
              selectedTab === tab
                ? 'bg-[#2d386a] text-white border-[#2d386a]'
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto h-auto">
        <div className="px-4 py-3 border-b">
          <h4 className="text-base font-semibold text-gray-800">Tour Request Details</h4>
          <p className="text-xs text-gray-500">
            Manage and track all incoming tour requests for Alfa Business Center.
          </p>
        </div>

        <table className="min-w-full divide-y divide-gray-200   overflow-x-auto">
          <thead className="bg-gray-50 text-xs text-left text-gray-600 uppercase">
            <tr>
              <th className="p-3">Request ID</th>
              <th className="p-3">Client Name</th>
              <th className="p-3">Contact Info</th>
              <th className="p-3">Requested Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 text-sm text-gray-800">
                <td className="p-3">{row.id}</td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">
                  <div>{row.email}</div>
                  <div className="text-xs text-gray-500">{row.phone}</div>
                </td>
                <td className="p-3">{row.date}</td>
                <td className="p-3">{row.time}</td>
                <td className="p-3">
                  <span
                    className={clsx(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      row.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <ActionMenu
                    onEdit={() => router.push(`/admin/tour/edit`)}
                    onDelete={() => alert(`Delete ${row.name}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
