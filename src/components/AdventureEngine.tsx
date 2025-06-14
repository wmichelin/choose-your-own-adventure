'use client';

import { useState, useEffect } from 'react';
import { Adventure, AdventureNode } from '@/types/adventure';

interface AdventureEngineProps {
  adventure: Adventure;
}

export default function AdventureEngine({ adventure }: AdventureEngineProps) {
  const [currentNode, setCurrentNode] = useState<AdventureNode | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // Initialize the game with the start node
    setCurrentNode(adventure.nodes[adventure.startNodeId]);
    setHistory([adventure.startNodeId]);
  }, [adventure]);

  const handleChoice = (nextNodeId: string) => {
    const nextNode = adventure.nodes[nextNodeId];
    setCurrentNode(nextNode);
    setHistory([...history, nextNodeId]);
  };

  const handleRestart = () => {
    setCurrentNode(adventure.nodes[adventure.startNodeId]);
    setHistory([adventure.startNodeId]);
  };

  if (!currentNode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{adventure.title}</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <p className="text-lg mb-6">{currentNode.text}</p>
        
        {currentNode.isEnd ? (
          <button
            onClick={handleRestart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        ) : (
          <div className="space-y-3">
            {currentNode.choices?.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice.nextNodeId)}
                className="w-full text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-colors"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Progress: {history.length} steps
      </div>
    </div>
  );
} 