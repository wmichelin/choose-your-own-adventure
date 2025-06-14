export interface AdventureNode {
  id: string;
  text: string;
  choices?: {
    text: string;
    nextNodeId: string;
  }[];
  isEnd?: boolean;
}

export interface Adventure {
  title: string;
  startNodeId: string;
  nodes: AdventureNode[];
} 