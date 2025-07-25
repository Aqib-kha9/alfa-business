import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { planSchema } from '@/app/lib/schemas/planSchema';
import { deleteImageFromCloudinary } from '@/app/lib/cloudinaryUtils';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('plans');

    const plan = await collection.findOne({ slug: params.slug });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json(plan, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Fetch error', details: err }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('plans');

    const existingPlan = await collection.findOne({ slug: params.slug });
    if (!existingPlan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    const validated = planSchema.partial().parse(body);

    // Optionally delete old images if updated
    if (validated.images && validated.images.length > 0 && existingPlan.images) {
      const oldImages = existingPlan.images;
      const newImages = validated.images;

      const removedImages = oldImages.filter((url: string) => !newImages.includes(url));
      await Promise.all(removedImages.map((url: string) => deleteImageFromCloudinary(url)));
    }

    const result = await collection.updateOne(
      { slug: params.slug },
      { $set: { ...validated, updatedAt: new Date().toISOString() } }
    );

    return NextResponse.json({ message: 'Plan updated', result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed', details: err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('plans');

    const plan = await collection.findOne({ slug: params.slug });
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Delete all images from Cloudinary
    if (plan.images && plan.images.length > 0) {
      await Promise.all(plan.images.map((url: string) => deleteImageFromCloudinary(url)));
    }

    await collection.deleteOne({ slug: params.slug });

    return NextResponse.json({ message: 'Plan deleted' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed', details: err }, { status: 500 });
  }
}
