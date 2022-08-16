interface Conversations {
  startNodeId: string;
  nodes: Record<string, ConversationNode>;
}

interface ConversationNode {
  childrenIds: string[];
  text?: string;
  input?: {
    text: string;
    type?: "button";
  };
  lark?: boolean; // whether it's from Lark or not, I add this
}
