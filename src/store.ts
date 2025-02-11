import { create } from 'zustand';
import { ChatStore, Chat, Message } from './types';

const createChat = (): Chat => ({
  id: Math.random().toString(36).substring(7),
  title: 'New Chat',
  messages: [],
  createdAt: new Date(),
});

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  currentChat: null,
  darkMode: true,
  
  addChat: () => set((state) => {
    const newChat = createChat();
    return {
      chats: [newChat, ...state.chats],
      currentChat: newChat,
    };
  }),

  setCurrentChat: (chatId) => set((state) => ({
    currentChat: state.chats.find((chat) => chat.id === chatId) || null,
  })),

  addMessage: (content, role) => set((state) => {
    if (!state.currentChat) return state;

    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      content,
      role,
      timestamp: new Date(),
    };

    const updatedChat = {
      ...state.currentChat,
      messages: [...state.currentChat.messages, newMessage],
    };

    return {
      chats: state.chats.map((chat) =>
        chat.id === state.currentChat.id ? updatedChat : chat
      ),
      currentChat: updatedChat,
    };
  }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));