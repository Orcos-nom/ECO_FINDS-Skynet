import { GoogleGenAI, Chat } from "@google/genai";

// Use Vite env variable
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error("VITE_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are a friendly and helpful customer support assistant for a website built with React. Your goal is to answer customer questions clearly, concisely, and in a professional manner. Keep your responses brief when possible.',
  },
});

export { chat };
