'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

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

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 border-b flex gap-4">
        <button
          onClick={() => setActiveTab('list')}
          className={clsx('pb-2', activeTab === 'list' && 'border-b-2 border-blue-600 font-semibold')}
        >
          Product List
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={clsx('pb-2', activeTab === 'create' && 'border-b-2 border-blue-600 font-semibold')}
        >
          Create Product
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-[1000px] w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Branch</th>
                <th className="p-2">Name</th>
                <th className="p-2">Code</th>
                <th className="p-2">Category</th>
                <th className="p-2">Purchase Unit</th>
                <th className="p-2">Sale Unit</th>
                <th className="p-2">Unit Ratio</th>
                <th className="p-2">Purchase Price</th>
                <th className="p-2">Sales Price</th>
                <th className="p-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{p.branch}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.code}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{p.purchaseUnit}</td>
                  <td className="p-2">{p.saleUnit}</td>
                  <td className="p-2">{p.unitRatio}</td>
                  <td className="p-2">₹{p.purchasePrice}</td>
                  <td className="p-2">₹{p.salesPrice}</td>
                  <td className="p-2">{p.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
    </div>
  );
}