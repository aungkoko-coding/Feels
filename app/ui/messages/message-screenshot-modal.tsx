import downloadAsImage from "@/utils/download-as-img";

const MessageScreenshotModal = ({
  open,
  message,
  replyMessage,
  onClose,
}: {
  message: string;
  replyMessage: string;
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
        className={`absolute top-10  h-full left-1/2 -translate-x-1/2 w-full bg-white py-1 rounded-md duration-300 ${
          open ? "translate-y-0" : "translate-y-1/2 pointer-events-none"
        }`}
      >
        <div className="h-full overflow-auto thin-scrollbar">
          <div className="max-w-[700px] mx-auto">
            <div className="flex justify-center my-1">
              <button
                onClick={() => downloadAsImage("message_to_print", "png")}
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
            <article id="message_to_print" className="p-10 bg-white">
              <header className="rounded-t-xl flex space-x-2 bg-orange-600 px-6 py-8">
                <h1 className="text-xl md:text-4xl title-font text-white font-extrabold w-full">
                  {message}
                </h1>
              </header>
              <p
                placeholder="Reply this message..."
                className="w-full rounded-b-xl outline-none px-6 py-4 bg-orange-100 text-xl font-medium placeholder:text-black/40 placeholder:font-medium min-h-[200px]"
              >
                {replyMessage}
              </p>
              <div className="flex flex-col items-center mt-14">
                <img src="/assets/images/logo.png" alt="" />
                <p className="font-medium text-orange-600">
                  Get anonymous messages!
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageScreenshotModal;
