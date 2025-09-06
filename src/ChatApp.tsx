import React, { useState, useEffect, useCallback } from "react";
import type { Message } from "./types";
import { Sender } from "./types";
import { chat } from "C:/Users/exion/Eco FInds/services/geminiService.ts";
import ChatWindow from "./components/ChatWindow";
import { toast } from "./components/ui/sonner"; // using Sonner notifications

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initializeChat = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const initialMessage: Message = {
        id: Date.now(),
        sender: Sender.Bot,
        text: "Hello! I'm your friendly support assistant. How can I help you today?",
      };
      setMessages([initialMessage]);
    } catch (e) {
      setError("Failed to initialize chat. Please check your API key and network connection.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: Sender.User,
      text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chat.sendMessage({ message: text });
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: Sender.Bot,
        text: response.text,
      };
      setMessages((prev) => [...prev, botMessage]);
      toast(response.text); // show bot response as toast
    } catch (e) {
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: Sender.Bot, text: errorMessage }]);
      toast.error(errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-sans bg-gray-50">
      <div className="w-full max-w-2xl h-full sm:h-[90vh] sm:max-h-[700px] flex flex-col border rounded-lg shadow-lg overflow-hidden bg-white">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ChatApp;
