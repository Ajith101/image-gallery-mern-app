import React from "react";
import { BASE_URL } from "../HomePage";

const ImageCard = ({ item, setShowImage, setPopup }) => {
  const handlePopUp = () => {
    setShowImage(true);
    setPopup(`${BASE_URL}${item.fileName}`);
  };

  return (
    <div className="h-[230px] cursor-pointer shadow-xl sm:h-[300px]">
      <img
        onClick={handlePopUp}
        src={`${BASE_URL}${item.fileName}`}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default ImageCard;
