import React from "react";
import imageCompression from "browser-image-compression";

const compressImage = async (image) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(image, options);
  return compressedFile;
};

export default compressImage;
