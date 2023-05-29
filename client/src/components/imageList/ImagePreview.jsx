import React from "react";

const ImagePreview = ({ popup, setShowImage }) => {
  return (
    <div className="absolute left-[50%] top-[50%] flex w-[650px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-[10px] bg-white p-[25px] shadow-xl">
      <h1 className="mb-[50px] text-[32px] font-[300] text-slate-600">
        Image Preview
      </h1>
      <img
        src={popup}
        className="h-[350px] w-full bg-[10%] object-cover"
        alt=""
      />
      <div
        onClick={() => setShowImage(false)}
        className="absolute right-[15px] top-[15px] flex cursor-pointer items-center justify-center rounded-[5px] bg-black px-[6px] py-[4px] text-center text-[16px] font-[400] text-white hover:opacity-80"
      >
        X
      </div>
      <div
        onClick={() => setShowImage(false)}
        className="mt-[20px] cursor-pointer rounded-[4px] bg-orange-700 px-[60px] py-[15px] text-center text-[16px] text-white hover:opacity-75"
      >
        Close
      </div>
    </div>
  );
};

export default ImagePreview;
