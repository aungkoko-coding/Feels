"use client";

import { useEffect, useMemo, useState } from "react";
import MessageScreenshotModal from "@/app/ui/messages/message-screenshot-modal";
import YoutubePlayerFormModal from "@/app/ui/messages/youtube-player-modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageType } from "@/app/lib/definitions";
import decryptText from "@/app/lib/decrypt";
import { axiosPatchData } from "@/app/lib/axios-config";
import useSessionData from "@/app/lib/hooks/useSessionData";
import { messagesQueryKey } from "@/app/ui/navbar/message-notification";
import { useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import amongUsAnimation from "../../../lib/animations/among-us-ani.json";
import sadFaceAnimation from "../../../lib/animations/sad-face-ani.json";

type MutationVariablesType = {
  messageId: number;
  apiToken: string;
};

const MessageDetailPage = () => {
  const searchParams = useSearchParams();
  const [replyMessage, setReplyMessage] = useState("");
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
  const messageId = searchParams.get("messageId")!;

  const { user } = useSessionData();
  const queryClient = useQueryClient();

  const { data: messages, isPending } = useQuery<MessageType[]>({
    queryKey: messagesQueryKey,
    enabled: false,
  });

  const message = useMemo(
    () => messages?.find((message) => message.id === +messageId),
    [messages, messageId]
  );

  const { mutate: setMessageAsSeen } = useMutation({
    mutationFn({ messageId, apiToken }: MutationVariablesType) {
      return axiosPatchData(`/messages/seen/${messageId}`, apiToken);
    },
    onMutate({ messageId }: MutationVariablesType) {
      const prevMessages =
        queryClient.getQueryData<MessageType[]>(messagesQueryKey);

      queryClient.setQueryData<MessageType[]>(
        messagesQueryKey,
        (prevMessages) => {
          return (
            prevMessages?.map((message) => {
              if (message.id === messageId) {
                return { ...message, seen: true };
              }
              return message;
            }) || []
          );
        }
      );

      return { prevMessages };
    },
    onError(_err, _new, context) {
      queryClient.setQueryData(messagesQueryKey, context?.prevMessages);
    },
  });

  useEffect(() => {
    if (message && !message.seen && user) {
      setMessageAsSeen({ messageId: message.id, apiToken: user.apiToken });
    }
  }, [message, user]);

  if (isPending) {
    return (
      <div className="flex justify-center">
        <Lottie
          animationData={amongUsAnimation}
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Lottie
          animationData={sadFaceAnimation}
          style={{ width: 150, height: 150 }}
        />
        <p>Message not found!</p>
      </div>
    );
  }

  const { content, youtubeLinks } = message;
  const alsoReceivedYoutubeLinks = youtubeLinks && youtubeLinks.length > 0;

  const openScreenshotModal = () => {
    setScreenshotModalOpen(true);
  };

  const closeScreenshotModal = () => {
    setScreenshotModalOpen(false);
  };

  const openYoutubeModal = () => {
    setYoutubeModalOpen(true);
  };

  const closeYoutubeModal = () => {
    setYoutubeModalOpen(false);
  };

  return (
    <>
      <div className="mb-20 container">
        <div className="max-w-[640px] mx-auto overflow-hidden">
          <div className="">
            <header className="rounded-t-xl flex space-x-2 bg-orange-600 px-6 py-8">
              <h1 className="text-xl md:text-4xl title-font text-white font-extrabold w-full">
                {isPending ? "Loading..." : decryptText(content)}
              </h1>
            </header>
            <textarea
              name="reply_message"
              id="reply_message"
              rows={8}
              placeholder="Reply this message..."
              className="w-full rounded-b-xl outline-none px-6 py-4 bg-orange-100 text-lg font-medium placeholder:text-black/40 placeholder:font-medium"
              onChange={(e) => setReplyMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center mt-3 gap-5">
            <button
              onClick={openScreenshotModal}
              className="text-center bg_orange_gradient text-white p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm-44,76a36,36,0,1,1-36-36A36,36,0,0,1,164,132Z"></path>
              </svg>
            </button>
            {alsoReceivedYoutubeLinks && (
              <button
                onClick={openYoutubeModal}
                className="relative text-center bg-red-600 text-white p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-72.11,61.81-48,32A4,4,0,0,1,108,160V96a4,4,0,0,1,6.22-3.33l48,32a4,4,0,0,1,0,6.66Z"></path>
                </svg>
                <span className="absolute top-0 -translate-y-1/3 right-0 translate-x-1/3 bg-black text-white text-[10px] w-[20px] h-[20px] rounded-full flex items-center justify-center">
                  {youtubeLinks.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {message && (
        <MessageScreenshotModal
          message={decryptText(content)}
          replyMessage={replyMessage}
          open={screenshotModalOpen}
          onClose={closeScreenshotModal}
        />
      )}
      {alsoReceivedYoutubeLinks && (
        <YoutubePlayerFormModal
          open={youtubeModalOpen}
          onClose={closeYoutubeModal}
          youtubeLinks={youtubeLinks}
        />
      )}
    </>
  );
};

export default MessageDetailPage;
