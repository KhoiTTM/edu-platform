import StartersWordlistClient from "@/components/StartersWordlistClient";

export const dynamic = "force-dynamic";

export default function StartersWordlistPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19]">
      <StartersWordlistClient backUrl="/hoc-tap/pre-a1-starter" />
    </main>
  );
}
