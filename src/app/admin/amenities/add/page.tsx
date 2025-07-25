'use client';

import { useState } from 'react';

type Amenity = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
};

export default function AddAmenity() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: ''
  });

  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAmenity: Amenity = {
      id: Date.now(),
      ...form
    };
    setAmenities([newAmenity, ...amenities]);
    setForm({ title: '', subtitle: '', description: '', imageUrl: '' });
  };

  const handleCancel = () => {
    setForm({ title: '', subtitle: '', description: '', imageUrl: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-6 mb-10 space-y-4 max-w-md w-full mx-auto"
    >
      <h3 className="text-lg font-semibold">Add New Amenity</h3>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Amenity Name"
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          required
          placeholder="Tag (e.g., Wi-Fi, Kitchen)"
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Description"
          className="border px-3 py-2 rounded-md w-full"
        />
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          required
          placeholder="Image URL"
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="reset"
          onClick={handleCancel}
          className="text-gray-600 hover:underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#2d386a] text-white px-4 py-2 rounded"
        >
          Save Amenity
        </button>
      </div>
    </form>
  );
}
