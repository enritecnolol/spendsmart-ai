import { Message } from "ai/react";
import { Fragment } from "react";
import { cn } from "../lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  messages: Message[];
  isLoading: boolean;
};
const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages) {
    return <Fragment></Fragment>;
  }
  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((message) => {
        console.log(message)
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "system",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-600 text-white": message.role === "user",
                }
              )}
            >
              {["system", "assistant"].includes(message.role) ? <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>') }}></div> : <p>{message.content}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
