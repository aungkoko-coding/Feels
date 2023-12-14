"use client";
import { axiosInstance } from "@/app/lib/axios-config";
import { FeedItemType } from "@/app/lib/definitions";
import FeedListItem from "@/app/ui/feed/vertical-list-item";
import FeedListItemSkeleton from "@/app/ui/feed/vertical-list-item-skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { toast } from "react-toastify";

const staleTimeDuration = 1000 * 60 * 10;

const FeedDetailPage: React.FC = () => {
  const parent = useRef<HTMLUListElement>(null);
  const searchParams = useSearchParams();
  const vid = searchParams.get("vid");

  const {
    data: video,
    isPending,
    isError: isErrorLoadingVideo,
  } = useQuery<FeedItemType>({
    queryKey: ["feed", vid],
    async queryFn() {
      const res = await axiosInstance.get(`/feed/${vid}`);
      return res.data;
    },
    enabled: !!vid,
  });

  const {
    data: latest30Videos,
    isPending: isPendingLatestVideos,
    isFetching,
    isError: isErrorLoadingListOfVideos,
    refetch,
  } = useQuery<FeedItemType[]>({
    queryKey: ["feed"],
    async queryFn() {
      const res = await axiosInstance.get(`/feed`, {
        data: {
          take: 30,
        },
      });

      return res.data;
    },
    staleTime: staleTimeDuration,
  });

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  useEffect(() => {
    if (isErrorLoadingVideo) {
      toast.error("Failed to load video.", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [isErrorLoadingVideo]);

  useEffect(() => {
    if (isErrorLoadingListOfVideos) {
      toast.error("Failed to load list of videos.", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [isErrorLoadingListOfVideos]);

  return (
    <section className="flex flex-col lg:flex-row gap-5 mb-20">
      <div className="basis-[100%] lg:basis-[65%] flex flex-col">
        <div className="relative">
          {isPending ? (
            <>
              {/** Loading skeleton */}
              <div className="animate-pulse max-h-[500px] w-full aspect-video rounded-md bg-gray-500"></div>
              <div className="mt-3 animate-pulse">
                <h1 className="h-6 w-[80%] bg-gray-500"></h1>
                <p className="mt-2 h-5 bg-gray-500"></p>
                <p className="mt-1 h-5 bg-gray-500"></p>
              </div>
            </>
          ) : (
            <>
              <iframe
                key={vid}
                className="max-h-[500px] w-full aspect-video rounded-md bg-slate-300 animate-pulse"
                loading="lazy"
                onLoad={(e) =>
                  e.currentTarget.classList.remove("animate-pulse")
                }
                src={`https://www.youtube.com/embed/${video?.vid}?cc_load_policy=1&cc_lang_pref=en`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="mt-3">
                <h1 className="text-lg sm:text-xl font-bold">{video?.title}</h1>
                {video?.description && (
                  <p className="font-medium text-black/90 mt-2 px-5 py-4 rounded-md bg-gray-200">
                    {video.description}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            disabled={isPendingLatestVideos || isFetching}
            onClick={() => refetch()}
            className="bg-orange-600 active:scale-95 hover:scale-105 duration-200 text-white px-4 py-3 rounded-md font-bold flex items-center space-x-1 disabled:opacity-70"
          >
            <span
              className={isFetching && !isPendingLatestVideos ? "rotate" : ""}
            >
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
      <ul
        ref={parent}
        className={`flex-1 pt-10 lg:pt-0 border-t lg:border-t-transparent border-orange-600 flex flex-col space-y-2 ${
          isFetching && !isPendingLatestVideos
            ? "opacity-70 pointer-events-none"
            : ""
        }`}
      >
        {isPendingLatestVideos ? (
          <>
            {Array.from({ length: 7 }, (_, i) => (
              <li key={i}>
                <FeedListItemSkeleton />
              </li>
            ))}
          </>
        ) : (
          <>
            {latest30Videos?.map((item) => (
              <li
                key={item.id}
                className={`${
                  parseInt(vid!) === item.id ? "text-orange-600" : ""
                }`}
              >
                <FeedListItem {...item} />
              </li>
            ))}
          </>
        )}
      </ul>
    </section>
  );
};

export default FeedDetailPage;
