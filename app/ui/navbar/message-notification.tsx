import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
// const Ably = require("ably");
// import { io } from "socket.io-client";
import { axiosGetData } from "@/app/lib/axios-config";
import { MessageType } from "@/app/lib/definitions";
import useSessionData from "@/app/lib/hooks/useSessionData";

export const messagesQueryKey = ["messages"];
// const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
// const socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_URL!);

declare const Ably: any;

const MessageNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useSessionData();

  const {
    data: messages,
    isError,
    error,
  } = useQuery<MessageType[]>({
    queryKey: messagesQueryKey,
    queryFn: async () => {
      const res = await axiosGetData("/messages", user?.apiToken);
      return res.data;
    },
    enabled: !!user?.id,
  });

  const unseenMessagesCount = useMemo(() => {
    return messages?.filter((message) => !message.seen).length || 0;
  }, [messages]);

  useEffect(() => {
    const ably = new Ably.Realtime.Promise({
      authUrl: `${process.env.NEXT_PUBLIC_API_URL}/ably/auth`,
    });
    if (user) {
      (async () => {
        await ably.connection.once("connected");

        // get the channel to subscribe to
        const channel = ably.channels.get("ably-notification");

        /*
          Subscribe to a channel.
          The promise resolves when the channel is attached
          (and resolves synchronously if the channel is already attached).
        */
        await channel.subscribe(
          `message-${user.username}-${user.id}`,
          (message: any) => {
            queryClient.setQueryData<MessageType[]>(
              messagesQueryKey,
              (prevData: any) => {
                return [message.data, ...(prevData || [])];
              }
            );
          }
        );
      })();
    }
    return () => {
      ably.close();
    };
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
  //     socket.on("connect", () => {
  //       console.log("Connected to WebSocket");
  //     });
  //     // receiver
  //     socket.on(`message-${user.username}-${user.id}`, (message) => {
  //       queryClient.setQueryData<MessageType[]>(
  //         messagesQueryKey,
  //         (prevData) => [message, ...(prevData || [])]
  //       );
  //     });
  //     return () => {
  //       socket.off();
  //     };
  //   }
  // }, [user]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load messages", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [isError, error]);

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
      {unseenMessagesCount > 0 && (
        <span className="absolute top-0 -translate-y-[20%] right-0 translate-x-1/4 bg-black text-white text-[10px] min-w-[22px] min-h-[22px] rounded-full flex items-center justify-center">
          {unseenMessagesCount > 9 ? "9+" : unseenMessagesCount}
        </span>
      )}
    </Link>
  );
};

export default MessageNotification;
