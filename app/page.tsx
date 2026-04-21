import { BrandSection } from "@/components/homepage/BrandSection";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HomepageStateNote } from "@/components/homepage/HomepageStateNote";
import { QualitySection } from "@/components/homepage/QualitySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomepageStateNote />
      <BrandSection />
      <QualitySection />
    </>
  );
}
