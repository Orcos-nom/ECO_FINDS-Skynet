
import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.User;

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><BotIcon className="w-5 h-5 text-gray-600"/></div>}
      
      <div 
        className={`rounded-xl px-4 py-3 max-w-sm md:max-w-md lg:max-w-lg shadow-sm whitespace-pre-wrap ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
        }`}
      >
        {message.text}
      </div>

      {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><UserIcon className="w-5 h-5 text-blue-600"/></div>}
    </div>
  );
};

export default ChatMessage;
