import {
  PublicContact,
  PublicCTA,
  PublicHero,
  PublicLayout,
  PublicServices,
  PublicTrust,
  PublicWhy,
} from "@/components/public";

export default function HomePage() {
  return (
    <PublicLayout>
      <PublicHero />
      <PublicServices />
      <PublicWhy />
      <PublicTrust />
      <PublicCTA />
      <PublicContact />
    </PublicLayout>
  );
}
