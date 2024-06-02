import RawHeader from "@/components/RawHeader";
import { Button } from "@headlessui/react";
import { SendHorizonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import OpenAI from "openai";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  dangerouslyAllowBrowser: true,
});

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial bot message
    setMessages([
      {
        text: "Hi, got anything you want to tell us about your order?",
        sender: "bot",
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      // Call OpenAI API
      try {
        // @ts-ignore
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for a small business restaurant. The restaurant offers deliveries around town and walk-in orders. Provide support for their menu and services.",
            },
            ...messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: input },
          ],
        });

        const botMessage =
          completion.choices[0].message?.content ||
          "Sorry, something went wrong. Please try again.";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, I couldn't process your request. Please try again.",
            sender: "bot",
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <RawHeader back ai />
      <div className="flex-1 p-4 overflow-auto my-10 flex flex-col-reverse">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`py-2 px-4 rounded-lg ${
                message.sender === "user"
                  ? "bg-green-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              <p className="text-xs">{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200 flex fixed z-10 bottom-0 right-0 left-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 bg-neutral-100 border outline-none rounded-full px-5 text-sm"
          placeholder="Type here..."
        />
        <Button
          onClick={handleSend}
          className="ml-2 w-9 flex items-center justify-center h-9 bg-green-500 text-white rounded-full"
        >
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
