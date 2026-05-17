import {
  PublicHero,
  PublicLayout,
  PublicServices,
  PublicWhy,
  PublicCTA,
  PublicTrust,
  PublicContact,
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
