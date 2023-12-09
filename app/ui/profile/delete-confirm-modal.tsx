import { axiosInstance } from "@/app/lib/axios-config";
import useSessionData from "@/app/lib/hooks/useSessionData";
import { domainName } from "@/app/lib/variables";
import { AxiosError, CanceledError } from "axios";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";

function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Deletion failed!"));
    }, 5000);
  });
}

const DeleteConfirmModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { user } = useSessionData();
  const [errorMsg, setErrorMsg] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const abortRef = useRef<AbortController | null>();

  const handleDeletionCancel = () => {
    abortRef.current?.abort();
    setErrorMsg("");
    onClose();
  };

  const handleDeletionConfirm = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      abortRef.current = new AbortController();
      (async () => {
        try {
          await axiosInstance.delete("/users/delete-me", {
            signal: abortRef.current?.signal,
            headers: {
              Authorization: `Bearer ${user?.apiToken}`,
            },
          });
          onClose();
          signOut({ callbackUrl: domainName });
        } catch (err) {
          if (err instanceof CanceledError) return;

          if (err instanceof AxiosError) {
            setErrorMsg(err.response?.data.message || err.message);
            return;
          }
          setErrorMsg((err as Error).message);
        } finally {
          setIsDeleting(false);
          abortRef.current = null;
        }
      })();
    }
  };

  return (
    <div
      role="modal"
      className={`fixed inset-0 bg-black/80 z-[999] duration-300 ${
        open ? "scale-100" : "pointer-events-none scale-0"
      }`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5 max-w-[400px] w-full rounded-md bg-white">
        <h1 className="font-bold">
          Are you sure you want to delete your account? The action can't be
          undone.
        </h1>
        {errorMsg && (
          <p className="px-3 py-2 border text-sm border-red-500 text-red-500 rounded-md my-2">
            {errorMsg}
          </p>
        )}
        <div className="flex justify-end mt-5 space-x-2">
          <button
            onClick={handleDeletionCancel}
            className="px-3 py-2 rounded-md active:scale-95 duration-200 bg-black text-white"
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            onClick={handleDeletionConfirm}
            className="px-3 py-2 rounded-md active:scale-95 duration-200 bg-red-500 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
