import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { useChatStore } from './store';

function App() {
  const { darkMode } = useChatStore();

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;