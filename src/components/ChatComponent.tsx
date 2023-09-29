"use client"

import { useChat } from "ai/react";
import MessageList from "./MessageList";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Message } from "ai";
import axios from "axios";
import { useEffect } from "react";
const ChatComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const response = await axios.post<Message[]>(`/api/get-messages`);
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    initialMessages: data || [],
  });

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="relative h-full overflow-y-auto"
      id="message-container"
    >
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white mt-2"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question"
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
