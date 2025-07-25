'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPlanPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    monthlyPrice: '',
    yearlyPrice: '',
    available: '',
    description: '',
    montlyFeactures: '',
    yearlyFeature: '',
    images: '',
    popular: '',
    features: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const featuresArr = form.features.split(',').map(f => f.trim());

    await fetch('/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, features: featuresArr }),
    });

    router.push('/admin/plans');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleCancel =() => {
    router.push('/admin/plans')
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-[#2d386a] mb-6 border-b pb-2">Add New Pricing Plan</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
  {[
    { label: "Title", name: "title", type: "input" },
    { label: "Monthly Price", name: "monthlyPrice", type: "input" },
    { label: "Yearly Price", name: "yearlyPrice", type: "input" },
    { label: "Available (Yes/No)", name: "available", type: "input" },
    { label: "Description", name: "description", type: "textarea", rows: 2 },
    { label: "Monthly Features", name: "montlyFeactures", type: "textarea", rows: 2 },
    { label: "Yearly Features", name: "yearlyFeature", type: "textarea", rows: 2 },
    { label: "Features (comma-separated)", name: "features", type: "textarea", rows: 2 },
    { label: "Image URL", name: "images", type: "input" },
    { label: "Popular (true/false)", name: "popular", type: "input" },
  ].map((field, index) => (
    <div key={index}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>
      {field.type === 'input' ? (
        <input
          name={field.name}
          value={(form as any)[field.name]}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
          required
        />
      ) : (
        <textarea
          name={field.name}
          rows={field.rows}
          value={(form as any)[field.name]}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
          required
        />
      )}
    </div>
  ))}

  <div className="md:col-span-2">
    <button
      type="submit"
      className="w-full py-3 bg-[#2d386a] text-white font-medium rounded hover:bg-[#1f2950] transition-all duration-200"
    >
      Save Plan
    </button>
    <button type='reset' onClick={handleCancel} className='px-4 my-2 py-2 border roundeds text-gray-700'>
      Cancel
    </button>
  </div>
</form>

    </div>
  );
}
