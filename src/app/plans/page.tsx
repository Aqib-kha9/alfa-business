import PlanCard from '@/app/components/reusable/PlanCard';
import { detailedPlans } from '@/app/data/plansData';
import FaqSection from '../components/reusable/FaqSection';

export default function AllPlansPage() {
  return (
    <section className="bg-gradient-to-b from-[#f5f7fa] to-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#1e2952]">
          Flexible Plans for Every Workspace Need
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Choose a workspace plan that fits your goals — from daily hot desks to
          fully equipped private offices. Enjoy all modern amenities, high-speed internet,
          meeting credits, and a productive environment.
        </p>

        {/* Mobile-only Popular Plans */}
        <div className="block sm:hidden mb-12">
          <div className="flex flex-col gap-6 ">
            {detailedPlans.map((plan, index) => (
              <div key={index} className="w-full max-w-sm mx-auto">
                <PlanCard
                  slug={plan.slug}
                  image={plan.image}
                  title={plan.title}
                  price={`₹${Number(plan.monthlyPrice).toLocaleString('en-IN')}`}
                  duration="/ Month"
                  features={plan.features}
                />
              </div>
            ))}
          </div>
        </div>

        {/* All Plans Grid for tablet+ */}
        <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {detailedPlans.map((plan, i) => (
            <div key={i} className="flex justify-center">
              <PlanCard
                slug={plan.slug}
                image={plan.image}
                title={plan.title}
                price={`₹${Number(plan.monthlyPrice).toLocaleString('en-IN')}`}
                duration="/ Month"
                features={plan.features}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-[#1e2952] mb-3">
            Not sure which plan is right for you?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact our workspace advisor to help you find the best match.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#1e2952] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#10172f] transition"
          >
            Talk to Us
          </a>
        </div>
        <FaqSection/>
      </div>
      
    </section>
  );
}
