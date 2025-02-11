import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload } from 'lucide-react';
import { useChatStore } from '../store';
import { getGeminiResponse } from '../lib/gemini';

export const ChatWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentChat, addMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      addMessage(`Uploaded file: ${file.name}`, 'user');
      // Here you would typically handle the file upload
      // For now, we'll just acknowledge it
      addMessage(`I see you've uploaded ${file.name}. I'll analyze its contents once file processing is implemented.`, 'assistant');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    addMessage(input, 'user');
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userInput);
      addMessage(response, 'assistant');
    } catch (error) {
      addMessage('I apologize, but I encountered an error. Please try again.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-blue-400">
        <p>Select or start a new chat with your AI Mentor</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="p-4 border-b border-gray-800 bg-black">
        <h1 className="text-2xl font-bold text-blue-400">Flazee AI - Your Personal Mentor</h1>
        <p className="text-gray-400">Powered by advanced AI to help you learn and grow</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {currentChat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 mb-4 ${
              message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#0B8D89] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/flazee-logo-white.png" 
                  alt="Flazee AI"
                  className="w-6 h-6 object-contain"
                />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'assistant'
                  ? 'bg-gray-800 text-white'
                  : 'bg-blue-600 text-white ml-auto'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-black">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? 'Flazee is thinking...' : 'Ask your AI mentor anything...'}
            disabled={isLoading}
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-800 text-blue-400 rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors"
          >
            <Upload size={20} />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};