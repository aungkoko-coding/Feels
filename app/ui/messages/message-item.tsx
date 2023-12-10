import decryptText from "@/app/lib/decrypt";
import { MessageType } from "@/app/lib/definitions";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const MessageItem = ({
  message: { id, seen, content, createdAt },
}: {
  message: MessageType;
}) => {
  return (
    <li
      className={`first-of-type:rounded-t-md last-of-type:rounded-b-md overflow-hidden hover:bg-gray-50 duration-200 relative ${
        !seen ? "text-orange-400" : ""
      }`}
    >
      <div className={`px-5 py-4 flex space-x-3 relative`}>
        <span
          className={`h-full p-3 flex items-center justify-center  rounded-md ${
            !seen
              ? "bg_orange_gradient text-white"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M216,40H40A16,16,0,0,0,24,56V184a16,16,0,0,0,16,16l59.5.06,14.78,24.17a16,16,0,0,0,27.41.06L156.53,200H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM84,132a12,12,0,1,1,12-12A12,12,0,0,1,84,132Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,132Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,132Z"></path>
          </svg>
        </span>
        <div>
          <p className="flex items-center space-x-2 font-medium truncate">
            <span>{seen ? decryptText(content) : "New message"}</span>
          </p>
          <span className="text-[12px] mt-2 block text-gray-500">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <Link href={`/messages/${id}`} className="absolute inset-0" />
      </div>
    </li>
  );
};

export default MessageItem;
