export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  darkMode: boolean;
  addChat: () => void;
  setCurrentChat: (chatId: string) => void;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  toggleDarkMode: () => void;
}