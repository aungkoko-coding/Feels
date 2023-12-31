import { axiosInstance } from "@/app/lib/axios-config";
import useSessionData from "@/app/lib/hooks/useSessionData";
import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useRef, useState } from "react";

const UpdateAvatarModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const { session, user } = useSessionData();
  const [errorMsg, setErrorMsg] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const abortRef = useRef<AbortController | null>();
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateCancel = () => {
    abortRef.current?.abort();
    setErrorMsg("");
    onClose();
  };

  const handleAvatarUpdate = () => {
    if (!isUpdating && avatarUrl) {
      setIsUpdating(true);
      abortRef.current = new AbortController();
      (async () => {
        try {
          await axiosInstance.patch(
            "/users/edit-me",
            {
              imgUrl: avatarUrl,
            },
            {
              signal: abortRef.current?.signal,
              headers: {
                Authorization: `Bearer ${user?.apiToken}`,
              },
            }
          );
          await axios.put(`/api/users/${user?.username}/revalidate`);
          setAvatarUrl("");
          session.update({ imgUrl: avatarUrl });
          onClose();
        } catch (err) {
          if (err instanceof CanceledError) return;

          if (err instanceof AxiosError) {
            setErrorMsg(err.response?.data.message || err.message);
            return;
          }
          setErrorMsg((err as Error).message);
        } finally {
          setIsUpdating(false);
          abortRef.current = null;
        }
      })();
    }
  };

  // For keyboard accessibility
  useEffect(() => {
    const focusUpdateButton = () => {
      if (open) {
        avatarInputRef.current?.focus();
      }
    };

    modalContainerRef.current?.addEventListener(
      "transitionend",
      focusUpdateButton
    );

    return () => {
      modalContainerRef.current?.removeEventListener(
        "transitionend",
        focusUpdateButton
      );
    };
  }, [open]);

  return (
    <div
      ref={modalContainerRef}
      role="modal"
      className={`fixed inset-0 bg-black/80 z-[999] duration-300 ${
        open ? "scale-100" : "pointer-events-none scale-0"
      }`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5 max-w-[400px] w-full rounded-md bg-white">
        <h1 className="font-bold">Update your avatar</h1>
        <input
          ref={avatarInputRef}
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Enter your new avatar url..."
          className="px-5 py-4 w-full rounded-md my-2 text-sm bg-white border outline-none focus:border-black/60 duration-200"
        />
        {errorMsg && (
          <p className="px-3 py-2 border text-sm border-red-500 text-red-500 rounded-md my-2">
            {errorMsg}
          </p>
        )}
        <div className="flex justify-end mt-5 space-x-2">
          <button
            onClick={handleUpdateCancel}
            className="px-3 py-2 rounded-md active:scale-95 duration-200 bg-black text-white"
          >
            Cancel
          </button>
          <button
            disabled={isUpdating}
            onClick={handleAvatarUpdate}
            className="px-3 py-2 rounded-md active:scale-95 duration-200 bg-orange-600 text-white"
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAvatarModal;
