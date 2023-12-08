import { YoutubeLinkType } from "@/app/lib/definitions";

const YoutubePlayerFormModal = ({
  open,
  youtubeLinks,
  onClose,
}: {
  youtubeLinks: YoutubeLinkType[];
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed z-[999] inset-0 bg-black/70 duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      tabIndex={open ? 0 : -1}
    >
      <button onClick={onClose} className="text-white absolute right-2 top-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
        </svg>
      </button>
      <div
        className={`absolute top-10 h-full left-1/2 -translate-x-1/2 w-full bg-white py-1 rounded-md duration-300 ${
          open ? "translate-y-0" : "translate-y-1/2 pointer-events-none"
        }`}
      >
        <div className="h-full overflow-auto thin-scrollbar">
          <div className="max-w-[700px] mx-auto p-[0.5rem]">
            <h1 className="title-font text-2xl font-extrabold text-center my-3">
              Someone expressed his/her emotions with {youtubeLinks.length}{" "}
              video(s)
            </h1>
            <ul className="flex flex-col space-y-16 mb-10">
              {youtubeLinks.map(({ id, vid, title, description }) => (
                <li key={id}>
                  <article>
                    <iframe
                      className="max-h-[500px] w-full aspect-video rounded-md bg-slate-300 animate-pulse"
                      loading="lazy"
                      onLoad={(e) =>
                        e.currentTarget.classList.remove("animate-pulse")
                      }
                      src={`https://www.youtube.com/embed/${vid}?cc_load_policy=1&cc_lang_pref=en`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <h1 className="text-lg sm:text-xl font-bold mt-3">
                      {title}
                    </h1>
                    <p className="font-medium text-black/90">{description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayerFormModal;
