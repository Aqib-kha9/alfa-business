'use client';

import { useParams, useRouter } from 'next/navigation';
import { detailedPlans } from '@/app/data/plansData';
import { useEffect, useState } from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';
import FaqSection from '@/app/components/reusable/FaqSection';
import PlanPricing from '@/app/components/reusable/PlanPricing';

export default function PlanDetailsPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [plan, setPlan] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const matchedPlan = detailedPlans.find((p) => p.slug === slug);
        setPlan(matchedPlan);
        if (matchedPlan) {
            if (matchedPlan.images?.length > 0) {
                setSelectedImage(matchedPlan.images[0]);
            } else {
                setSelectedImage(matchedPlan.image);
            }
        }
    }, [slug]);

    if (!plan) return <div className="text-center py-10 text-gray-600">Loading plan details...</div>;

    const handlePrev = () => {
        if (plan.images?.length > 1 && selectedImage) {
            const currentIndex = plan.images.findIndex((img: string) => img === selectedImage);
            const prevIndex = (currentIndex - 1 + plan.images.length) % plan.images.length;
            setSelectedImage(plan.images[prevIndex]);
        }
    };

    const handleNext = () => {
        if (plan.images?.length > 1 && selectedImage) {
            const currentIndex = plan.images.findIndex((img: string) => img === selectedImage);
            const nextIndex = (currentIndex + 1) % plan.images.length;
            setSelectedImage(plan.images[nextIndex]);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
            <div className="text-sm text-gray-500 flex items-center gap-2">
                <span className="hover:underline cursor-pointer" onClick={() => router.push('/')}>Home</span>
                <ChevronRight className="w-4 h-4" />
                <span className="hover:underline cursor-pointer" onClick={() => router.push('/plans')}>Plans</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-gray-800">{plan.title}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-4xl font-extrabold text-[#1e2952]">{plan.title}</h1>
                {plan.available ? (
                    <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">✅ Seats Available</span>
                ) : (
                    <span className="px-4 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">❌ Fully Booked</span>
                )}
            </div>

            <div className="relative">
                <div className="mb-4 relative">
                    <img
                        src={selectedImage || plan.image}
                        alt={plan.title}
                        className="w-full h-[400px] object-cover rounded-xl shadow-md cursor-zoom-in"
                        onClick={() => setIsModalOpen(true)}
                    />

                    {plan.images?.length > 1 && (
                        <>
                            <button onClick={handlePrev} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button onClick={handleNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {plan.images?.length > 1 && (
                    <div className="flex gap-3 flex-wrap justify-center">
                        {plan.images.map((img: string, idx: number) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${plan.title} thumbnail ${idx + 1}`}
                                className={`w-20 h-16 object-cover rounded-md border cursor-pointer hover:opacity-80 ${selectedImage === img ? 'border-blue-600' : 'border-gray-300'}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
                        <div className="relative w-full max-w-6xl px-4" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-white bg-black/60 hover:bg-black rounded-full p-1">✕</button>
                            <img src={selectedImage || plan.image} alt="Zoomed" className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg" />
                            {plan.images?.length > 1 && (
                                <>
                                    <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
           <PlanPricing plan={plan} />
            <FaqSection/>
        </div>
    );
}
