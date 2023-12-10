import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { axiosGetData } from "@/app/lib/axios-config";
import { MessageType } from "@/app/lib/definitions";
import useSessionData from "@/app/lib/hooks/useSessionData";

const MessageNotification = () => {
  const { user } = useSessionData();
  const queryClient = useQueryClient();

  // I use two separate queries for performance reason.
  const { data: messages } = useQuery<MessageType[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosGetData("/messages", user?.apiToken);
      return res.data;
    },
    enabled: !!user?.id,
  });

  const { data: newMessages } = useQuery<MessageType[]>({
    queryKey: ["messages-via-socket"],
    enabled: false,
    initialData: [],
  });

  const unseenMessagesCount = useMemo(() => {
    return messages?.filter((message) => !message.seen).length || 0;
  }, [messages]);

  const totalUnseenMessageCount = useMemo(() => {
    return (
      (newMessages?.filter((message) => !message.seen).length || 0) +
      unseenMessagesCount
    );
  }, [newMessages, unseenMessagesCount]);

  const socketRef = useRef(io(`ws://${process.env.NEXT_PUBLIC_SOCKET_URL}`));
  useEffect(() => {
    const socket = socketRef.current;
    if (user) {
      socket.on("connect", () => {
        console.log("Connected to WebSocket");
      });

      // receiver
      socket.on(`message-${user.username}-${user.id}`, (message) => {
        queryClient.setQueryData<MessageType[]>(
          ["messages-via-socket"],
          (prevData) => [message, ...(prevData || [])]
        );
      });
    }

    return () => {
      socket.off();
    };
  }, [user]);
  return (
    <Link href="/messages" className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path>
      </svg>
      {totalUnseenMessageCount > 0 && (
        <span className="absolute top-0 -translate-y-[20%] right-0 translate-x-1/4 bg-black text-white text-[10px] min-w-[22px] min-h-[22px] rounded-full flex items-center justify-center">
          {totalUnseenMessageCount > 9 ? "9+" : totalUnseenMessageCount}
        </span>
      )}
    </Link>
  );
};

export default MessageNotification;
