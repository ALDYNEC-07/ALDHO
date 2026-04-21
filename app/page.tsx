import { BrandSection } from "@/components/homepage/BrandSection";
import { CollectionTeaserSection } from "@/components/homepage/CollectionTeaserSection";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HomepageStateNote } from "@/components/homepage/HomepageStateNote";
import { LabelSection } from "@/components/homepage/LabelSection";
import { QualitySection } from "@/components/homepage/QualitySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomepageStateNote />
      <BrandSection />
      <QualitySection />
      <LabelSection />
      <CollectionTeaserSection />
    </>
  );
}
