"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import autoAnimate from "@formkit/auto-animate";
import { YoutubeFormDataType } from "@/app/lib/definitions";
import YoutubeForm from "@/app/ui/message-form/youtube-form";
import YoutubeList from "@/app/ui/message-form/youtube-list";
import { axiosInstance } from "@/app/lib/axios-config";
import { AxiosError } from "axios";
import Alert from "@/app/ui/alert";
import Link from "next/link";
import { UserType } from "./page";

const MessageBox = ({ user }: { user: UserType }) => {
  const [errorLoadingAvatar, setErrorLoadingAvatar] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState("");
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeFormDataType[]>([]);
  const [openYTForm, setOpenYTForm] = useState(false);
  const { username, imgUrl } = user;

  const rootParent = useRef<HTMLDivElement>(null);
  const parent = useRef<HTMLDivElement>(null);

  const closeYTForm = () => {
    setOpenYTForm(false);
  };

  const toggleYTForm = () => {
    setOpenYTForm((prev) => !prev);
  };

  const handleRemoveYTItem = (index: number) => {
    setYoutubeVideos((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    rootParent.current && autoAnimate(rootParent.current);
  }, []);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [status]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    (async () => {
      try {
        await axiosInstance.post(`/messages/${username}`, {
          content: message,
          youtubeLinks: youtubeVideos.map((yt) => ({
            ...yt,
            url: yt.youtubeLink,
          })),
        });
        setErrorMessage("");
        setStatus("sent");
      } catch (err) {
        setStatus("idle");
        if (err instanceof AxiosError) {
          setErrorMessage(err.response?.data.message || err.message);
          return;
        }
        setErrorMessage((err as Error).message);
      }
    })();
  };

  return (
    <div className="my-10 container">
      <div ref={rootParent} className="max-w-[600px] mx-auto overflow-hidden">
        {status === "sent" ? (
          <div className="flex text-white flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15l-35.71-75.39a4,4,0,0,1,.79-4.54l57.26-57.27a8,8,0,0,0-11.31-11.31L97.08,147.6a4,4,0,0,1-4.54.79l-75-35.53A16.37,16.37,0,0,1,8,97.36,15.89,15.89,0,0,1,19.57,82.84l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z"></path>
            </svg>
            <p className="text-2xl font-bold text-center mt-3">
              You successfully sent your message!
            </p>
            <Link
              href="/"
              className="w-full flex items-center justify-center text-center active:scale-95 duration-200 mt-32 px-5 py-4 bg-black text-lg font-medium text-white rounded-xl"
            >
              Get your own messages!
            </Link>
            <button
              onClick={() => {
                setStatus("idle");
                setMessage("");
                setYoutubeVideos([]);
              }}
              className="text-lg font-medium underline underline-offset-2 mt-3"
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            <form id="sendForm" onSubmit={handleSubmit}>
              <header className="rounded-t-xl flex space-x-2 bg-white px-5 py-4">
                <div className="w-10 h-10 uppercase rounded-full flex items-center justify-center bg-pink-700 text-white">
                  {imgUrl && !errorLoadingAvatar ? (
                    <img
                      src={imgUrl}
                      alt={username}
                      className="cover rounded-full"
                      onError={() => setErrorLoadingAvatar(true)}
                    />
                  ) : (
                    username[0]
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-sm">@{username}</h2>
                  <p className="text-sm font-semibold">
                    Tell me what you feel anonymously!
                  </p>
                </div>
              </header>
              <textarea
                name="anonymous_message"
                id="anonymous_message"
                rows={8}
                placeholder="Tell me what you feel..."
                className="w-full rounded-b-xl outline-none px-5 py-4 bg-orange-300 text-lg font-medium placeholder:text-black/40 placeholder:font-medium"
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </form>
            <div ref={parent} className="my-5">
              {youtubeVideos.length > 0 && (
                <YoutubeList
                  youtubeVideos={youtubeVideos}
                  onRemove={handleRemoveYTItem}
                />
              )}
              {openYTForm && (
                <YoutubeForm
                  onSubmit={(youtubeVideo) => {
                    setYoutubeVideos((prev) => [...prev, youtubeVideo]);
                    closeYTForm();
                  }}
                  closeForm={closeYTForm}
                />
              )}
              {!openYTForm && youtubeVideos.length < 3 && (
                <>
                  <button
                    type="button"
                    onClick={toggleYTForm}
                    className="w-full active:scale-95 duration-200 flex items-center justify-center space-x-2 py-4 text-orange-600 bg-white border border-orange-600 rounded-xl text-lg font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                    </svg>
                    <span>Add youtube video</span>
                  </button>
                  <p className="text-sm text-center mt-1 text-white">
                    Express your feelings with youtube videos ({" "}
                    <span>{youtubeVideos.length}</span> / 3 )
                  </p>
                </>
              )}

              {message && (
                <>
                  <button
                    form="sendForm"
                    className="w-full flex items-center justify-center text-center active:scale-95 duration-200 mt-10 px-5 py-4 bg-black text-lg font-medium text-white rounded-xl"
                  >
                    {status === "sending" ? (
                      <svg
                        className="rotate"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm33.25,62.75a12,12,0,0,0,8.49-3.52L204.37,68.6a12,12,0,0,0-17-17L164.77,74.26a12,12,0,0,0,8.48,20.49ZM224,116H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.26,48.77a12,12,0,1,0-17,17l22.63,22.63a12,12,0,0,0,17-17ZM128,180a12,12,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12,12,0,0,0,128,180ZM74.26,164.77,51.63,187.4a12,12,0,0,0,17,17l22.63-22.63a12,12,0,1,0-17-17ZM76,128a12,12,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12,12,0,0,0,76,128ZM68.6,51.63a12,12,0,1,0-17,17L74.26,91.23a12,12,0,0,0,17-17Z"></path>
                      </svg>
                    ) : (
                      <span>Send!</span>
                    )}
                  </button>
                  <div className="mt-3">
                    <Alert
                      show={!!errorMessage}
                      message={errorMessage}
                      fontSize="text-sm"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
