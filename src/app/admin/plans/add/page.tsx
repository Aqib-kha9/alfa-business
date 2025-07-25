'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPlanPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', price: '', features: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const featuresArr = form.features.split(',').map(f => f.trim());
    await fetch('/api/plans', {
      method: 'POST',
      body: JSON.stringify({ ...form, features: featuresArr }),
    });
    router.push('/admin/plans');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Pricing Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Title" required
          value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Price" required
          value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <textarea className="w-full p-2 border rounded" placeholder="Features (comma-separated)" required
          value={form.features} onChange={e => setForm({ ...form, features: e.target.value })}></textarea>
        <button type="submit" className="bg-[#2d386a] text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
