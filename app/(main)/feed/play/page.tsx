"use client";
import { feed } from "@/app/lib/feed-data";
import FeedListItem from "@/app/ui/feed/vertical-list-item";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const FeedDetailPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const vid = searchParams.get("vid");
  console.log(vid);
  const toggle = () => {
    setLoading((prev) => !prev);
  };
  return (
    <section className="flex flex-col lg:flex-row gap-5 mb-10">
      <div className="basis-[100%] lg:basis-[65%] flex flex-col">
        <div className="relative">
          <iframe
            className="max-h-[500px] w-full aspect-video rounded-md bg-slate-300 animate-pulse"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.remove("animate-pulse")}
            src={`https://www.youtube.com/embed/h9JyIl6BR_U?cc_load_policy=1&cc_lang_pref=en`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="mt-3">
          <h1 className="text-lg sm:text-xl font-bold">{feed[0].title}</h1>
          <p className="font-medium mt-2 text-black/90">
            {feed[0].description}
          </p>

          <div className="mt-5 flex justify-end">
            <button
              onClick={toggle}
              className="bg-orange-600 active:scale-95 hover:scale-105 duration-200 text-white px-4 py-3 rounded-md font-bold flex items-center space-x-1"
            >
              <span className={loading ? "rotate" : ""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M197.66,186.34a8,8,0,0,1,0,11.32C196.58,198.73,170.82,224,128,224c-23.36,0-46.13-9.1-66.28-26.41L45.66,213.66A8,8,0,0,1,32,208V160a8,8,0,0,1,8-8H88a8,8,0,0,1,5.66,13.66L73.08,186.24C86.08,197.15,104.83,208,128,208c36.27,0,58.13-21.44,58.34-21.66A8,8,0,0,1,197.66,186.34Zm21.4-145.73a8,8,0,0,0-8.72,1.73L194.28,58.41C174.13,41.1,151.36,32,128,32,85.18,32,59.42,57.27,58.34,58.34A8,8,0,0,0,69.66,69.66C69.87,69.44,91.73,48,128,48c23.17,0,41.92,10.85,54.92,21.76L162.34,90.34A8,8,0,0,0,168,104h48a8,8,0,0,0,8-8V48A8,8,0,0,0,219.06,40.61Z"></path>
                </svg>
              </span>
              <span>Refresh List</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 pt-10 lg:pt-0 border-t lg:border-t-transparent border-orange-600 flex flex-col space-y-2">
        {feed.map((item) => (
          <FeedListItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default FeedDetailPage;
