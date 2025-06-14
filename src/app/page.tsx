import AdventureEngine from '@/components/AdventureEngine';
import sampleAdventure from '@/data/sample-adventure.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <AdventureEngine adventure={sampleAdventure} />
    </main>
  );
}
