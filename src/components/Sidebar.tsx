import React from 'react';
import { PlusCircle, MessageSquare, Sun, Moon } from 'lucide-react';
import { useChatStore } from '../store';

export const Sidebar: React.FC = () => {
  const { chats, currentChat, darkMode, addChat, setCurrentChat, toggleDarkMode } = useChatStore();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
      <button
        onClick={addChat}
        className="flex items-center gap-2 w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors mb-4"
      >
        <PlusCircle size={20} />
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setCurrentChat(chat.id)}
            className={`flex items-center gap-2 w-full p-3 rounded-lg transition-colors mb-2 ${
              currentChat?.id === chat.id
                ? 'bg-gray-700'
                : 'hover:bg-gray-800'
            }`}
          >
            <MessageSquare size={20} />
            <span className="truncate">{chat.title}</span>
          </button>
        ))}
      </div>

      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-gray-800 transition-colors mt-auto"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};