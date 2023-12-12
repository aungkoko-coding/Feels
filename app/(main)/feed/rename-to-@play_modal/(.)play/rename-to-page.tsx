"use client";
import Modal from "@/app/ui/modal";
import FeedDetailPage from "../../play/page";
import { usePathname } from "next/navigation";

const PlayModal = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname.includes("play") && (
        <Modal>
          <FeedDetailPage />
        </Modal>
      )}
    </>
  );
};

export default PlayModal;
