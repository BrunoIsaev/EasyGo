import { AfishaStrip } from "@/components/AfishaStrip";
import { AppPreview } from "@/components/AppPreview";
import { EcosystemIntro } from "@/components/EcosystemIntro";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InvestorSection } from "@/components/InvestorSection";
import { LocationDetailCard } from "@/components/LocationDetailCard";
import { LocationsMasonry } from "@/components/LocationsMasonry";
import { Navbar } from "@/components/Navbar";
import { DETAILED_LOCATIONS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <EcosystemIntro />
        <AfishaStrip />
        <LocationsMasonry />

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-4xl">
              Карточки локаций
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {DETAILED_LOCATIONS.map((loc) => (
                <LocationDetailCard key={loc.name} {...loc} />
              ))}
            </div>
          </div>
        </section>

        <Features />
        <AppPreview />
        <InvestorSection />
      </main>
      <Footer />
    </>
  );
}
