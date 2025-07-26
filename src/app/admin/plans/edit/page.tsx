'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPlanPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<{
    title: string;
    monthlyPrice: string;
    yearlyPrice: string;
    available: string;
    description: string;
    montlyFeactures: string;
    yearlyFeature: string;
    images: string | File;
    popular: string;
    features: string;
  }>({
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

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const featuresArr = form.features.split(',').map(f => f.trim());

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('monthlyPrice', form.monthlyPrice);
    formData.append('yearlyPrice', form.yearlyPrice);
    formData.append('available', form.available);
    formData.append('description', form.description);
    formData.append('montlyFeactures', form.montlyFeactures);
    formData.append('yearlyFeature', form.yearlyFeature);
    formData.append('popular', form.popular);
    formData.append('features', JSON.stringify(featuresArr));

    if (form.images instanceof File) {
      formData.append('images', form.images);
    }

    await fetch(`/api/plans/${id}`, {
      method: 'PUT',
      body: formData,
    });

    router.push('/admin/plans');
  };

  const handleCancel = () => {
    setForm({
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
    })
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
    { name: 'images', label: 'Image Upload', type: 'file', placeholder: 'Upload Image' },
    { name: 'popular', label: 'Popular (true/false)', type: 'input', placeholder: 'true or false' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto mt-4 bg-white shadow-md rounded-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2d386a] border-b pb-2">Edit Plan</h1>
        <button
          onClick={() => router.back()}
          className="mt-2 sm:mt-0 px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map(({ name, label, type }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
              {label}
            </label>

            {type === 'input' ? (
              <input
                id={name}
                type="text"
                className="w-full p-2 border rounded"
                required
                value={form[name as keyof typeof form] as string}
                onChange={e => handleChange(name, e.target.value)}
              />
            ) : type === 'file' ? (
              <>
                <input
                  id={name}
                  type="file"
                  className="w-full p-2 border rounded"
                  accept="image/*"
                  onChange={e => handleChange(name, e.target.files?.[0] || '')}
                />
                {form.images && typeof form.images === 'string' && (
                  <img
                    src={form.images}
                    alt="Preview"
                    className="mt-2 h-24 object-contain border rounded"
                  />
                )}
              </>
            ) : (
              <textarea
                id={name}
                className="w-full p-2 border rounded"
                required
                rows={3}
                value={form[name as keyof typeof form] as string}
                onChange={e => handleChange(name, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
          <button type="submit" className="bg-[#2d386a] text-white px-6 py-2 rounded w-full sm:w-auto">
            Update Plan
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border border-gray-300 px-6 py-2 rounded w-full sm:w-auto text-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}