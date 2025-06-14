'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface AdventureNode {
  id: string;
  text: string;
  isEnd: boolean;
  choices: Choice[];
}

interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
}

interface Adventure {
  id: string;
  title: string;
  startNodeId: string;
  nodes: AdventureNode[];
  createdAt: string;
}

export default function AdventureDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    fetchAdventure();
  }, [params.id]);

  const fetchAdventure = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Adventure')
        .select(`
          *,
          nodes:AdventureNode (
            *,
            choices:Choice (*)
          )
        `)
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setAdventure(data);
      setCurrentNodeId(data.startNodeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = (nextNodeId: string) => {
    if (currentNodeId) {
      setHistory(prev => [...prev, currentNodeId]);
    }
    setCurrentNodeId(nextNodeId);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentNodeId(previousNode);
    }
  };

  const getCurrentNode = (): AdventureNode | undefined => {
    return adventure?.nodes.find(node => node.id === currentNodeId);
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

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8 text-gray-400">Loading adventure...</div>
        </div>
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8 text-gray-400">
            Adventure not found
          </div>
        </div>
      </div>
    );
  }

  const currentNode = getCurrentNode();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/adventures"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Adventures
          </Link>
          <h1 className="text-3xl font-bold mt-4 text-white">{adventure.title}</h1>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          {currentNode && (
            <>
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-lg text-gray-200">{currentNode.text}</p>
              </div>

              {currentNode.isEnd ? (
                <div className="space-y-4">
                  <div className="text-center text-gray-400 mb-4">
                    The End
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setCurrentNodeId(adventure.startNodeId);
                        setHistory([]);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Start Over
                    </button>
                    {history.length > 0 && (
                      <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Go Back
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    {currentNode.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice.nextNodeId)}
                        className="w-full p-4 text-left bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
                      >
                        <span className="text-gray-200">{choice.text}</span>
                      </button>
                    ))}
                  </div>
                  {history.length > 0 && (
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Go Back
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 