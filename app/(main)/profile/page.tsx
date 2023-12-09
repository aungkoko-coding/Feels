"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import QRCode from "qrcode";
import useSessionData from "@/app/lib/hooks/useSessionData";
import { domainName } from "@/app/lib/variables";
import download from "downloadjs";
import DeleteConfirmModal from "@/app/ui/profile/delete-confirm-modal";

const ProfilePage = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorLoadingAvatar, setErrorLoadingAvatar] = useState(false);
  const { user } = useSessionData();
  const sharableMessageBoxUrl = `${domainName}/send/${user?.username}`;

  const handleURLCopy = () => {
    if (copied) {
      return;
    }
    navigator.clipboard.writeText(sharableMessageBoxUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  const handleDownloadQR = () => {
    QRCode.toDataURL(sharableMessageBoxUrl)
      .then((url) => {
        download(url, "my-message-box.png");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="container">
      <div className="max-w-[640px] mx-auto flex flex-col">
        <div className="flex">
          <div className="w-24 h-24 rounded-full border bg-orange-500 text-white flex items-center justify-center">
            {user?.imgUrl && !errorLoadingAvatar ? (
              <img
                src={user?.imgUrl}
                alt={user?.username}
                className="cover rounded-full"
                onError={() => setErrorLoadingAvatar(true)}
              />
            ) : (
              <span className="text-2xl font-extrabold  uppercase select-none">
                {user?.username[0]}
              </span>
            )}
          </div>
          <div className="flex flex-col ml-2">
            <h2 className="text-xl font-bold">@{user?.username}</h2>
            <div className="flex space-x-2 mt-2 text-sm">
              <button className="px-3 py-2 rounded-md active:scale-95 duration-200 bg-black text-white">
                Edit avatar
              </button>
              <button
                onClick={() => signOut({ callbackUrl: domainName })}
                className="px-3 py-2 rounded-md active:scale-95 duration-200 bg-black text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p>To receive anonymous messages, share your message box url:</p>
          <p className="px-3 py-1 mt-3 bg-white border text-sm rounded-md inline-block relative">
            {sharableMessageBoxUrl}
            {copied && (
              <span className="absolute left-[105%] top-0 p-1 h-full rounded-md bg-gray-500 text-[12px] text-white flex items-center justify-center">
                Copied
              </span>
            )}
          </p>
          <div className="flex text-sm space-x-2 mt-3">
            <button
              onClick={handleURLCopy}
              className="px-3 py-2 flex items-center space-x-1 rounded-md active:scale-95 duration-200 bg-black text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#5bd917"
                viewBox="0 0 256 256"
              >
                <path d="M137.54,186.36a8,8,0,0,1,0,11.31l-9.94,10A56,56,0,0,1,48.38,128.4L72.5,104.28A56,56,0,0,1,149.31,102a8,8,0,1,1-10.64,12,40,40,0,0,0-54.85,1.63L59.7,139.72a40,40,0,0,0,56.58,56.58l9.94-9.94A8,8,0,0,1,137.54,186.36Zm70.08-138a56.08,56.08,0,0,0-79.22,0l-9.94,9.95a8,8,0,0,0,11.32,11.31l9.94-9.94a40,40,0,0,1,56.58,56.58L172.18,140.4A40,40,0,0,1,117.33,142,8,8,0,1,0,106.69,154a56,56,0,0,0,76.81-2.26l24.12-24.12A56.08,56.08,0,0,0,207.62,48.38Z"></path>
              </svg>
              <span>Copy URL</span>
            </button>
            <button
              onClick={handleDownloadQR}
              className="px-3 py-2 flex items-center space-x-1 rounded-md active:scale-95 duration-200 bg-black text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#5bd917"
                viewBox="0 0 256 256"
              >
                <path d="M232,48V88a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h40A8,8,0,0,1,232,48ZM72,200H40V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16Zm152-40a8,8,0,0,0-8,8v32H184a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,224,160ZM32,96a8,8,0,0,0,8-8V56H72a8,8,0,0,0,0-16H32a8,8,0,0,0-8,8V88A8,8,0,0,0,32,96ZM80,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,80,80Zm104,88V88a8,8,0,0,0-16,0v80a8,8,0,0,0,16,0ZM144,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,144,80Zm-32,0a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,112,80Z"></path>
              </svg>
              <span>Download QR</span>
            </button>
          </div>

          <button
            onClick={handleDeleteModalOpen}
            className="px-5 py-4 mt-24 rounded-md bg-red-500 w-full flex justify-center items-center space-x-1 text-white active:scale-95 duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
            <span>Delete Account</span>
          </button>
        </div>
      </div>
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
      />
    </div>
  );
};

export default ProfilePage;
