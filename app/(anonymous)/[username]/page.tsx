"use client";

import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { YoutubeFormDataType } from "@/app/lib/definitions";
import YoutubeForm from "@/app/ui/message-form/youtube-form";
import YoutubeList from "@/app/ui/message-form/youtube-list";

const SendAnonymousPage = () => {
  const parent = useRef<HTMLDivElement>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeFormDataType[]>([]);
  const [openYTForm, setOpenYTForm] = useState(false);

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
    parent.current && autoAnimate(parent.current);
  }, []);

  return (
    <div className="my-10 container">
      <section className="max-w-[600px] mx-auto overflow-hidden">
        <header className="rounded-t-xl flex space-x-2 bg-white px-5 py-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-700 text-white">
            A
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm">@aungkoko</h2>
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
        ></textarea>

        <div ref={parent} className="mt-5">
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
                <span>Add Youtube Video</span>
              </button>
              <p className="text-sm text-center mt-1 text-white">
                Express your feelings with youtube videos (
                <span>{youtubeVideos.length}</span> / 3)
              </p>
            </>
          )}
          <button className="w-full active:scale-95 duration-200 mt-10 px-5 py-4 bg-black text-lg font-medium text-white rounded-xl">
            Send!
          </button>
        </div>
      </section>
    </div>
  );
};

export default SendAnonymousPage;
