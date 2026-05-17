import {
  PublicHero,
  PublicLayout,
  PublicServices,
  PublicWhy,
  PublicCTA,
  PublicContact,
} from "@/components/public";

export default function HomePage() {
  return (
    <PublicLayout>
      <PublicHero />
      <PublicServices />
      <PublicWhy />
      <PublicCTA />
      <PublicContact />
    </PublicLayout>
  );
}
