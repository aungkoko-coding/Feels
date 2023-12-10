"use client";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { messages } from "@/app/lib/data";
import MessageItem from "@/app/ui/messages/message-item";
import Lottie from "lottie-react";
import noDataAnimation from "../../lib/animations/no-data-ani.json";
import loadingAnimation from "../../lib/animations/loading-ani.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/app/lib/axios-config";
import useSessionData from "@/app/lib/hooks/useSessionData";
import decryptText from "@/app/lib/decrypt";
import { MessageType } from "@/app/lib/definitions";
import { io } from "socket.io-client";

const MessagesPage = () => {
  const { user } = useSessionData();
  const { data, isPending, isError, error } = useQuery<MessageType[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/messages", {
        headers: { Authorization: `Bearer ${user?.apiToken}` },
      });
      return res.data;
    },
    enabled: !!user?.id,
  });

  // console.log(error);
  const parent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  const socketRef = useRef(io("ws://localhost:3001"));
  useEffect(() => {
    const socket = socketRef.current;
    if (user) {
      socket.on("connect", () => {
        console.log("Connected to WebSocket");
      });

      // receiver
      socket.on(`message-${user.username}-${user.id}`, (message) => {
        console.log("Received message:", message);
      });
    }

    return () => {
      socket.off();
    };
  }, [user]);

  return (
    <div className="container relative mb-10">
      <div className="absolute hidden md:block top-0 left-o w-[200px] ">
        <img src="/assets/images/message.gif" alt="Message box" />
      </div>
      <div className="md:ml-[200px]">
        {messages && messages.length > 0 ? (
          <ul ref={parent} className="divide-y-2 bg-white shadow-sm">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </ul>
        ) : (
          <DataNotFound />
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

function LoadingMessages() {
  return (
    <div className="flex flex-col items-center">
      <Lottie
        animationData={loadingAnimation}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}

function DataNotFound() {
  return (
    <div className="flex flex-col items-center">
      <Lottie
        animationData={noDataAnimation}
        style={{ width: 300, height: 300 }}
      />
      <p>You haven't received any messages yet!</p>
    </div>
  );
}
