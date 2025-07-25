'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPlanPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', price: '', features: '' });

  useEffect(() => {
    fetch(`/api/plans/${id}`).then(res => res.json()).then(data => {
      setForm({
        title: data.title,
        price: data.price,
        features: data.features.join(', ')
      });
    });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const featuresArr = form.features.split(',').map(f => f.trim());
    await fetch(`/api/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...form, features: featuresArr }),
    });
    router.push('/admin/plans');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Title" required
          value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Price" required
          value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <textarea className="w-full p-2 border rounded" placeholder="Features" required
          value={form.features} onChange={e => setForm({ ...form, features: e.target.value })}></textarea>
        <button type="submit" className="bg-[#2d386a] text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
