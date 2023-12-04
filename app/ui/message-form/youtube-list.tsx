import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { YoutubeFormDataType } from "@/app/lib/definitions";

const YoutubeList = ({
  youtubeVideos,
  onRemove,
}: {
  youtubeVideos: YoutubeFormDataType[];
  onRemove: (index: number) => void;
}) => {
  const parent = useRef<HTMLUListElement>(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, []);

  return (
    <ul
      ref={parent}
      className="my-10  rounded-xl bg-orange-300 divide-y-[1px] divide-orange-600 border border-orange-600"
    >
      {youtubeVideos.map(
        (
          { title, description, youtubeLink, public: visible, timestamp },
          i
        ) => (
          <li key={timestamp} className="px-5 py-4 relative">
            <h2 className="font-bold w-[80%] flex items-center space-x-2">
              {visible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20ZM107.07,172h41.86A115.75,115.75,0,0,1,128,209.85,115.75,115.75,0,0,1,107.07,172Zm-5.66-24a142.55,142.55,0,0,1,0-40h53.18a142.55,142.55,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.22a164.54,164.54,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128ZM148.93,84H107.07A115.75,115.75,0,0,1,128,46.15,115.75,115.75,0,0,1,148.93,84Zm29.85,24h30.79a83.52,83.52,0,0,1,0,40H178.78a164.54,164.54,0,0,0,0-40Zm20.74-24H174a148.59,148.59,0,0,0-13.95-33.63A84.5,84.5,0,0,1,199.52,84ZM96,50.37A148.59,148.59,0,0,0,82,84H56.48A84.5,84.5,0,0,1,96,50.37ZM56.48,172H82a148.59,148.59,0,0,0,14,33.63A84.5,84.5,0,0,1,56.48,172Zm103.57,33.63A148.59,148.59,0,0,0,174,172h25.52A84.5,84.5,0,0,1,160.05,205.63Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M208,76H180V56A52,52,0,0,0,76,56V76H48A20,20,0,0,0,28,96V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V96A20,20,0,0,0,208,76ZM100,56a28,28,0,0,1,56,0V76H100ZM204,204H52V100H204Zm-60-52a16,16,0,1,1-16-16A16,16,0,0,1,144,152Z"></path>
                </svg>
              )}

              <span className="truncate flex-1">{title}</span>
            </h2>
            <p className="text-sm text-black/80 font-medium w-[80%] truncate">
              {description}
            </p>
            <a
              href="#"
              target="_blank"
              className="text-sm underline w-[80%] truncate mt-3 block"
            >
              {youtubeLink}
            </a>
            <button
              onClick={() => onRemove(i)}
              className="absolute top-1/2 -translate-y-1/2 right-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
              </svg>
            </button>
          </li>
        )
      )}
    </ul>
  );
};

export default YoutubeList;
