import React, { useState, useEffect } from "react";

import { imageUrl } from "../../../../api/config";

const AvatarImage = ({ review }) => {
  const [currentSrc, setCurrentSrc] = useState(
    imageUrl + "avatar/" + review.avatar
  );
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3; 
  const retryInterval = 2000; 

  useEffect(() => {
    setCurrentSrc(imageUrl + "avatar/" + review.avatar);
    setHasError(false);
    setRetryCount(0);
  }, [review.avatar, imageUrl]);

  const handleError = () => {
    if (retryCount < maxRetries) {
      setRetryCount((prevCount) => prevCount + 1);
      setTimeout(() => {
        setCurrentSrc(
          `${imageUrl}avatar/${review.avatar}?retry=${retryCount + 1}`
        );
      }, retryInterval);
    } else {
      setHasError(true);
      setCurrentSrc("https://placehold.co/32x32/cccccc/333333?text=user"); 
    }
  };

  return (
    <img
      className="w-8 h-8 rounded-full object-cover"
      src={currentSrc}
      alt={review.avatar || "User Avatar"}
      onError={hasError ? null : handleError}
    />
  );
};

export default AvatarImage;
