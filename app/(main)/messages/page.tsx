"use client";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { messages } from "@/app/lib/data";
import MessageItem from "@/app/ui/messages/message-item";

const MessagesPage = () => {
  const parent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  return (
    <div className="container relative mb-10">
      <div className="absolute hidden md:block top-0 left-o w-[200px] ">
        <img src="/assets/images/message.gif" alt="" />
      </div>
      <div className="md:ml-[200px]">
        <ul ref={parent} className="divide-y-2 bg-white shadow-sm">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagesPage;
