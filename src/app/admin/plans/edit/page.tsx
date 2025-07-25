'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPlanPage() {
  const { id } = useParams();
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
    features: '',
  });

  useEffect(() => {
    fetch(`/api/plans/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || '',
          monthlyPrice: data.monthlyPrice || '',
          yearlyPrice: data.yearlyPrice || '',
          available: data.available || '',
          description: data.description || '',
          montlyFeactures: data.montlyFeactures || '',
          yearlyFeature: data.yearlyFeature || '',
          images: data.images || '',
          popular: data.popular || '',
          features: data.features?.join(', ') || '',
        });
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const featuresArr = form.features.split(',').map(f => f.trim());

    await fetch(`/api/plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, features: featuresArr }),
    });

    router.push('/admin/plans');
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const inputFields = [
    { name: 'title', label: 'Plan Title', type: 'input', placeholder: 'Enter Plan Title' },
    { name: 'monthlyPrice', label: 'Monthly Price', type: 'input', placeholder: 'Enter Monthly Price' },
    { name: 'yearlyPrice', label: 'Yearly Price', type: 'input', placeholder: 'Enter Yearly Price' },
    { name: 'available', label: 'Available (Yes/No)', type: 'input', placeholder: 'Enter Yes or No' },
    { name: 'description', label: 'Plan Description', type: 'textarea', placeholder: 'Enter Description' },
    { name: 'montlyFeactures', label: 'Monthly Features', type: 'textarea', placeholder: 'Enter Monthly Features' },
    { name: 'yearlyFeature', label: 'Yearly Features', type: 'textarea', placeholder: 'Enter Yearly Features' },
    { name: 'features', label: 'Other Features (comma separated)', type: 'textarea', placeholder: 'e.g., feature1, feature2' },
    { name: 'images', label: 'Image URL', type: 'input', placeholder: 'Enter Image URL' },
    { name: 'popular', label: 'Popular (true/false)', type: 'input', placeholder: 'true or false' },
  ];
  const handleCancel = () => {
    router.push('/admin/plans')
  }
  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-[#2d386a] border-b pb-2">Edit Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-5">

        {inputFields.map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
              {label}
            </label>
            {type === 'input' ? (
              <input
                id={name}
                className="w-full p-2 border rounded"
                required
                value={form[name as keyof typeof form]}
                onChange={e => handleChange(name, e.target.value)}
              />
            ) : (
              <textarea
                id={name}
                className="w-full p-2 border rounded"
                required
                rows={3}
                value={form[name as keyof typeof form]}
                onChange={e => handleChange(name, e.target.value)}
              />
            )}
          </div>
        ))}
        <div>

          <button type="submit" className="bg-[#2d386a] text-white px-4 py-2 rounded w-130">
            Update Plan
          </button>
          <button type='reset' onClick={handleCancel} className='px-4 my-2 py-2 border roundeds text-gray-700'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
