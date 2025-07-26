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
    features: '',
    popular: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
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
    if (imageFile) formData.append('image', imageFile);

    await fetch('/api/plans', {
      method: 'POST',
      body: formData,
    });

    router.push('/admin/plans');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
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
      features: '',
      popular: '',
    })
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex items-center justify-between flex-wrap mb-4">

      <h1 className="text-2xl font-semibold text-[#2d386a] mb-6 border-b pb-2">
        Add New Pricing Plan
      </h1>
      <button
          onClick={() => router.back()}
          type="button"
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
          ← Back
        </button>
          </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: 'Title', name: 'title', type: 'input' },
          { label: 'Monthly Price', name: 'monthlyPrice', type: 'input' },
          { label: 'Yearly Price', name: 'yearlyPrice', type: 'input' },
          { label: 'Available (Yes/No)', name: 'available', type: 'input' },
          { label: 'Description', name: 'description', type: 'textarea', rows: 2 },
          { label: 'Monthly Features', name: 'montlyFeactures', type: 'textarea', rows: 2 },
          { label: 'Yearly Features', name: 'yearlyFeature', type: 'textarea', rows: 2 },
          { label: 'Features (comma-separated)', name: 'features', type: 'textarea', rows: 2 },
          { label: 'Popular (true/false)', name: 'popular', type: 'input' },
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

        {/* Image Upload Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-[#2d386a] text-white font-medium rounded hover:bg-[#1f2950] transition-all duration-200"
          >
            Save Plan
          </button>
          <button
            type="reset"
            onClick={handleCancel}
            className="px-4 my-2 py-2 border rounded text-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
