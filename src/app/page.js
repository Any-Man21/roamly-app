import { Suspense } from "react";
import Banner from "@/components/Banner";
import StatsSection from "@/components/home/StatsSection";
import FeaturedDestinations, {
  FeaturedSkeleton
} from "@/components/home/FeaturedDestinations";
import {
  WhyChoose,
  HowItWorks,
  Experiences,
  Awards,
  RefundPolicy,
  Testimonials,
  Faq,
  FinalCta,
} from "@/components/home/Sections";



export default function Home() {
  return (
    <div>
      <Banner />
      <StatsSection />
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedDestinations />
      </Suspense>
      <WhyChoose />
      <HowItWorks />
      <Experiences />
      <Awards />
      <RefundPolicy />
      <Testimonials />
      <Faq />
      <FinalCta />
    </div>
  );
}