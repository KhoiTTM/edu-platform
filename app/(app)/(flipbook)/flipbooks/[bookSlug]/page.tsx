import FlipbookClient from '@/components/flipbook/FlipbookClient';

export default async function FlipbookPage({ params }: { params: Promise<{ bookSlug: string }> }) {
  const { bookSlug } = await params;
  return <FlipbookClient bookSlug={bookSlug} />;
}
