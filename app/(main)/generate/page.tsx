"use client";
import downloadAsImage from "@/utils/download-as-img";

const GenerateImg = () => {
  return (
    <>
      <div
        id="generate-img"
        className="w-[1200px] h-[630px] flex items-center justify-center mx-auto bg-white"
        style={{ fontSize: "38px" }}
      >
        <span className="title-font italic font-extrabold text-orange-600">
          Share your thoughts and emotions anonymously!
        </span>
      </div>
      <button
        className="mx-auto block my-5 px-5 py-4 bg-black text-white rounded-md"
        onClick={() => downloadAsImage("generate-img")}
      >
        Generate
      </button>
    </>
  );
};

export default GenerateImg;
