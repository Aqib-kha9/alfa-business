// /types/plan.ts
export interface Plan {
  title: string;
  slug: string;
  image: string;
  images?: string[];
  available: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  features?: string[];
}
