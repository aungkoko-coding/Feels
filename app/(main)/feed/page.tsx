"use client";
import { useQuery } from "@tanstack/react-query";
import FeedItem from "../../ui/feed/item";
import { axiosGetData } from "@/app/lib/axios-config";
import { FeedItemType } from "@/app/lib/definitions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import FeedItemSkeleton from "@/app/ui/feed/item-skeleton";

const FeedPage = () => {
  const {
    data: feed,
    isError,
    isPending,
  } = useQuery<FeedItemType[]>({
    queryKey: ["feed"],
    async queryFn() {
      const res = await axiosGetData("/feed");
      return res.data;
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load feed.", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  }, [isError]);

  return (
    <section>
      <h1 className="title-font text-4xl font-extrabold sm:text-5xl orange_gradient py-2 text-center">
        What others feel?
      </h1>
      <p className="text-center">Here is the list of last 30 videos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-5 my-10">
        {isPending ? (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <FeedItemSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {feed?.map((item) => (
              <FeedItem key={item.id} {...item} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default FeedPage;
