'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Adventure {
  id: string;
  title: string;
  createdAt: string;
}

export default function AdventuresPage() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAdventures();
  }, [page]);

  const fetchAdventures = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Adventure')
        .select('id, title, createdAt')
        .order('createdAt', { ascending: false })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;

      setAdventures(data || []);
      setHasMore(data?.length === itemsPerPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Choose Your Adventure</h1>
        
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading adventures...</div>
        ) : adventures.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No adventures found. Create your first adventure!
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {adventures.map((adventure) => (
                <Link
                  key={adventure.id}
                  href={`/adventures/${adventure.id}`}
                  className="block p-6 bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <h2 className="text-xl font-semibold mb-2 text-white">{adventure.title}</h2>
                  <p className="text-sm text-gray-400">
                    Created {new Date(adventure.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 border border-gray-700 hover:border-gray-600 disabled:hover:border-gray-700"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-400">Page {page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore}
                className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 border border-gray-700 hover:border-gray-600 disabled:hover:border-gray-700"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 