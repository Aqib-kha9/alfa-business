import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { planSchema } from '@/app/lib/schemas/planSchema';
import cloudinary from '@/app/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('plans');

    const plans = await collection.find({}).toArray();
    return NextResponse.json(plans, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch plans', details: err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const monthlyPrice = Number(formData.get('monthlyPrice'));
    const yearlyPrice = Number(formData.get('yearlyPrice'));
    const available = formData.get('available') === 'true';
    const description = formData.get('description') as string | null;

    const monthlyFeatures = JSON.parse(formData.get('monthlyFeatures') as string);
    const yearlyFeatures = JSON.parse(formData.get('yearlyFeatures') as string);
const popular = formData.get('popular') === 'true';
    const files = formData.getAll('images') as File[];

    if (files.length > 5) {
      return NextResponse.json({ error: 'Max 5 images allowed' }, { status: 400 });
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'plans' }, (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          })
          .end(buffer);
      });

      imageUrls.push(uploadRes.secure_url);
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const parsed = planSchema.parse({
      title,
      slug,
      monthlyPrice,
      yearlyPrice,
      available,
      monthlyFeatures,
      yearlyFeatures,
      images: imageUrls,
      description,
      popular,
      createdAt: new Date().toISOString(),
    });

    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('plans');

    const result = await collection.insertOne(parsed);

    return NextResponse.json({ _id: result.insertedId, ...parsed }, { status: 201 });

  } catch (err: any) {
    console.error('[PLAN POST ERROR]', err);
    return NextResponse.json(
      { error: 'Upload or DB error', details: err.message },
      { status: 500 }
    );
  }
}
