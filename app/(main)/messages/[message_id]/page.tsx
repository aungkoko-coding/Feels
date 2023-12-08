"use client";

import { useState } from "react";
import { messages } from "@/app/lib/data";
import MessageScreenshotModal from "@/app/ui/messages/message-screenshot-modal";
import { notFound } from "next/navigation";
import YoutubePlayerFormModal from "@/app/ui/messages/youtube-player-modal";

const MessageDetailPage = ({ params }: { params: { message_id: string } }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
  const message = messages.find((message) => message.id === +params.message_id);

  if (!message) {
    notFound();
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
            <header className="rounded-t-xl flex space-x-2 bg_orange_gradient px-10 py-8">
              <h1 className="text-xl md:text-4xl title-font text-white font-extrabold  w-full">
                {content}
              </h1>
            </header>
            <textarea
              name="reply_message"
              id="reply_message"
              rows={8}
              placeholder="Reply this message..."
              className="w-full rounded-b-xl outline-none px-5 py-4 bg-orange-100 text-lg font-medium placeholder:text-black/40 placeholder:font-medium"
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
          message={content}
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
