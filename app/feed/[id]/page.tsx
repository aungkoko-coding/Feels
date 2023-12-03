"use client";
import { feed } from "@/app/lib/feed-data";
import FeedListItem from "@/app/ui/feed/vertical-list-item";

const FeedDetail = () => {
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
          {/* <div className="absolute inset-0 animation-pulse bg-red-500 -z-1"></div> */}
        </div>

        <div className="mt-3">
          <h1 className="text-lg sm:text-xl font-bold">{feed[0].title}</h1>
          <p className="font-medium mt-2 text-black/90">
            {feed[0].description}
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col space-y-2 pt-10 max-w-lg:border-t border-orange-600 lg:pt-0">
        {feed.map((item) => (
          <FeedListItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default FeedDetail;
