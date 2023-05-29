import React, { useEffect, useState } from "react";
import axios from "axios";
import ImagePreview from "./imageList/ImagePreview";
import Images from "./imageList/Images";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const HomePage = () => {
  const [allImages, setAllImages] = useState([]);
  const [imageDetail, setImageDetail] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [popup, setPopup] = useState("");
  const [upload, setUpload] = useState(null);

  const handleImage = async (event) => {
    setImageDetail(event.target.files[0]);
    postImage(event);
  };

  const postImage = async (event) => {
    const formData = new FormData();
    formData.append("photos", event.target.files[0]);

    const response = await axios(`${BASE_URL}/api/images`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress: (data) => {
        setUpload((pre) => (pre = Math.ceil((data.loaded / data.total) * 100)));
      },
    });
    setAllImages(response.data);
  };

  const getAllImages = async () => {
    try {
      const response = await axios(`${BASE_URL}/api/images`);
      setAllImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const displayAllImages = allImages?.map((item) => {
    return (
      <Images
        setPopup={setPopup}
        setShowImage={setShowImage}
        item={item}
        key={item.id}
      />
    );
  });

  return (
    <div className="mb-[84px] flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-[90%] flex-col items-center sm:w-[80%] lg:w-[946px]">
        <h1 className="mt-[81px] text-[32px] font-[400] md:mb-[12px] md:text-[50px]">
          Photo Gallery
        </h1>
        <h3 className="text-[18px] font-[300] text-[#ACACAC] sm:mb-[76px] sm:text-[32px]">
          A picture is worth thousand words.
        </h3>
        <form className="flex flex-col items-center justify-center">
          {imageDetail && (
            <img
              src={URL.createObjectURL(imageDetail)}
              className="h-[120px] w-[120px] object-cover"
              alt=""
            />
          )}
          <label
            htmlFor="upload_file"
            className="mt-[20px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border-[1px] border-[#EED8C0] text-center text-[30px] font-[300] text-[#EED8C0]"
          >
            +
          </label>
          {imageDetail && (
            <h3 className="text-[22px] font-[400] text-[#ACACAC]">
              {imageDetail?.name}
            </h3>
          )}
          <input
            onChange={handleImage}
            type="file"
            name="upload_file"
            id="upload_file"
            className="invisible"
          />
        </form>
        {upload && (
          <div className="flex w-full items-center gap-[10px]">
            <div
              style={{ width: `${upload}%` }}
              className={`mb-[33px] mt-[27px] h-[7px] rounded-[10px] bg-[#EFD9C2] transition-all`}
            ></div>
            <h3 className="text-[16px]">
              {upload}
              {"%"}
            </h3>
          </div>
        )}
        <div className="relative grid h-full w-full grid-cols-2 gap-[10px] sm:grid-cols-3 md:gap-[23px]">
          {displayAllImages}{" "}
          {showImage && (
            <ImagePreview popup={popup} setShowImage={setShowImage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
