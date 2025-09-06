
import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { BotIcon } from 'C:/Users/exion/Eco FInds/src/components/icons/BotIcon.tsx';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  error: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isLoading, error }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="bg-white rounded-lg shadow-2xl flex flex-col h-full">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-t-lg flex items-center shadow-md">
        <BotIcon className="w-8 h-8 mr-3" />
        <div>
          <h1 className="text-xl font-bold">AI Customer Support</h1>
          <p className="text-sm opacity-90">Powered by Gemini</p>
        </div>
      </header>
      
      <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-xs lg:max-w-md animate-pulse">
                Bot is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {error && <div className="p-4 text-red-600 bg-red-100 border-t border-gray-200 text-sm">{error}</div>}

      <footer className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default ChatWindow;
