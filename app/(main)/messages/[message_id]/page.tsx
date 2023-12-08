"use client";

import { useState } from "react";
import { messages } from "@/app/lib/data";
import MessageScreenshotModal from "@/app/ui/messages/message-screenshot-modal";

const MessageDetailPage = ({ params }: { params: { message_id: string } }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const message = messages.find((message) => message.id === +params.message_id);

  const openScreenshotModal = () => {
    setScreenshotModalOpen(true);
  };

  const closeScreenshotModal = () => {
    setScreenshotModalOpen(false);
  };
  return (
    <>
      <div className="mb-20 container">
        <div className="max-w-[640px] mx-auto overflow-hidden">
          <div className="">
            <header className="rounded-t-xl flex space-x-2 bg_orange_gradient px-10 py-8">
              <h1 className="text-xl md:text-4xl title-font text-white font-extrabold text-center w-full">
                {message?.content}
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
          <div className="flex justify-center mt-3">
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
          </div>
        </div>
      </div>
      {message && (
        <MessageScreenshotModal
          message={message.content}
          replyMessage={replyMessage}
          open={screenshotModalOpen}
          onClose={closeScreenshotModal}
        />
      )}
    </>
  );
};

export default MessageDetailPage;
