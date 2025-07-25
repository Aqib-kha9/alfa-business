'use client';

import { useEffect, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Image from 'next/image';
import clsx from 'clsx';
import ActionMenu from '../components/ActionMenu';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  branch?: string;
  name: string;
  code: string;
  category: string;
  purchaseUnit: string;
  saleUnit: string;
  unitRatio: string;
  purchasePrice: number;
  salesPrice: number;
  remarks?: string;
};

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});

  useEffect(() => {
    // Fetch initial products
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setForm({});
      setActiveTab('list');
    }
  };

  const plans = [
    {
      image: '/images/flexi.jpg',
      title: 'Flexi Desk',
      price: '$199/month',
      features: 'Hot Desk Access, High-speed Wi-Fi...',
      popular: false,
      available: true,
    },
    {
      image: '/images/dedicated.jpg',
      title: 'Dedicated Desk',
      price: '$399/month',
      features: 'Dedicated Desk, Locker Storage...',
      popular: true,
      available: true,
    },
    {
      image: '/images/office.jpg',
      title: 'Private Office',
      price: '$999/month',
      features: 'Private Lockable Office, Premium Furniture...',
      popular: true,
      available: true,
    },
    {
      image: '/images/office.jpg',
      title: 'Virtual Office',
      price: '$299/month',
      features: 'Business Address, Mail Forwarding...',
      popular: false,
      available: true,
    },
    {
      image: '/images/office.jpg',
      title: 'Meeting Room Pass',
      price: '$50/day',
      features: 'Access to Meeting Room, High-speed Wi-Fi...',
      popular: false,
      available: true,
    },
    {
      image: '/images/office.jpg',
      title: 'Event Space',
      price: '$1000/event',
      features: 'Exclusive Event Access, Catering Options...',
      popular: false,
      available: false,
    },
  ];
  const router = useRouter();
  const handleNewPlan = () => {
    router.push("/admin/plans/add")
  }
  return (
    <>
      <div className="p-4 md:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Pricing Plans Overview</h1>
          <p className="mt-1 text-gray-600 text-sm">
            Manage your coworking space&apos;s pricing strategies. Here you can add new <br /> plans, update existing ones,
            and control their visibility and popularity.
          </p>
        </div>

        {/* Subheading and Add Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Pricing Plans</h2>
          <button onClick={handleNewPlan} className="flex items-center bg-blue-950 text-white  text-sm px-4 py-2 rounded hover:bg-black">
            <CiCirclePlus className='mx-2' />  Add New Plan
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-lg bg-white border">
          <table className="min-w-auto w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Features</th>
                <th className="p-3 text-center">Popular</th>
                <th className="p-3 text-center">Available</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3">{plan.title}</td>
                  <td className="p-3 text-blue-600 font-medium">{plan.price}</td>
                  <td className="p-3 text-gray-700">{plan.features}</td>
                  <td className="p-3 text-center">{plan.popular ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-center text-green-600 font-semibold">{plan.available ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-center">
                    <ActionMenu
                      onEdit={() => router.push('/admin/plans/edit')}
                      onDelete={() => alert(`Delete ${plan.title}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {activeTab === 'create' && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="branch" placeholder="Branch" value={form.branch || ''} onChange={handleInputChange} className="input input-bordered" />
          <input type="text" name="name" placeholder="Name" value={form.name || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="text" name="code" placeholder="Code" value={form.code || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="text" name="category" placeholder="Category" value={form.category || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="text" name="purchaseUnit" placeholder="Purchase Unit" value={form.purchaseUnit || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="text" name="saleUnit" placeholder="Sale Unit" value={form.saleUnit || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="text" name="unitRatio" placeholder="Unit Ratio" value={form.unitRatio || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="number" name="purchasePrice" placeholder="Purchase Price" value={form.purchasePrice || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="number" name="salesPrice" placeholder="Sales Price" value={form.salesPrice || ''} onChange={handleInputChange} className="input input-bordered" required />
          <input type="text" name="remarks" placeholder="Remarks" value={form.remarks || ''} onChange={handleInputChange} className="input input-bordered md:col-span-2" />
          <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Save Product</button>
        </form>
      )}
    </>
  );
}