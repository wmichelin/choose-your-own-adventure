'use client';

import { useState, useEffect } from 'react';
import { Adventure, AdventureNode } from '@/types/adventure';

interface AdventureEngineProps {
  adventureId?: string;
}

export default function AdventureEngine({ adventureId }: AdventureEngineProps) {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [currentNode, setCurrentNode] = useState<AdventureNode | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        const response = await fetch('/api/adventures');
        const adventures = await response.json();
        const selectedAdventure = adventures[0]; // For now, just use the first adventure
        setAdventure(selectedAdventure);
        setCurrentNode(selectedAdventure.nodes.find((node: AdventureNode) => node.id === selectedAdventure.startNodeId));
        setHistory([selectedAdventure.startNodeId]);
      } catch (err) {
        setError('Failed to load adventure');
      } finally {
        setLoading(false);
      }
    };

    fetchAdventure();
  }, [adventureId]);

  const handleChoice = (nextNodeId: string) => {
    if (!adventure) return;
    const nextNode = adventure.nodes.find((node: AdventureNode) => node.id === nextNodeId);
    if (nextNode) {
      setCurrentNode(nextNode);
      setHistory([...history, nextNodeId]);
    }
  };

  const handleRestart = () => {
    if (!adventure) return;
    const startNode = adventure.nodes.find((node: AdventureNode) => node.id === adventure.startNodeId);
    if (startNode) {
      setCurrentNode(startNode);
      setHistory([adventure.startNodeId]);
    }
  };

  if (loading) {
    return <div className="text-gray-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!currentNode || !adventure) {
    return <div className="text-gray-800">No adventure found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{adventure.title}</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <p className="text-lg mb-6 text-gray-800">{currentNode.text}</p>
        
        {currentNode.isEnd ? (
          <button
            onClick={handleRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        ) : (
          <div className="space-y-3">
            {currentNode.choices?.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice.nextNodeId)}
                className="w-full text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-colors text-gray-800"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-700">
        Progress: {history.length} steps
      </div>
    </div>
  );
} 