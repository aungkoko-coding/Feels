"use client";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import MessageItem from "@/app/ui/messages/message-item";
import Lottie from "lottie-react";
import noDataAnimation from "../../lib/animations/no-data-ani.json";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/app/lib/axios-config";
import useSessionData from "@/app/lib/hooks/useSessionData";
import { MessageType } from "@/app/lib/definitions";
import { toast } from "react-toastify";

const MessagesPage = () => {
  const { user } = useSessionData();
  const {
    data: messages,
    isPending,
    isError,
  } = useQuery<MessageType[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/messages", {
        headers: { Authorization: `Bearer ${user?.apiToken}` },
      });
      return res.data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load messages", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [isError]);

  // console.log(error);
  const parent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  return (
    <div className="container relative mb-20">
      <div className="absolute hidden md:block top-0 left-o w-[200px] ">
        <img src="/assets/images/message.gif" alt="Message box" />
      </div>
      <div className="md:ml-[200px]">
        {isPending && <LoadingMessages />}
        {messages && messages.length > 0 ? (
          <ul ref={parent} className="divide-y-2 bg-white shadow-sm">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </ul>
        ) : (
          <>{!isPending && <DataNotFound />}</>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

function LoadingMessages() {
  return (
    <div className="flex flex-col items-center mt-3">
      <span className="rotate">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm37.25,58.75a8,8,0,0,0,5.66-2.35l22.63-22.62a8,8,0,0,0-11.32-11.32L167.6,77.09a8,8,0,0,0,5.65,13.66ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
        </svg>
      </span>
      <p className="mt-1">Loading messages...</p>
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
      <p>You haven&apos;t received any messages yet!</p>
    </div>
  );
}
