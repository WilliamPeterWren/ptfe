import React, { useState } from "react";

const EmbeddedGoogleMap = ({ userAddress }) => {
  // console.log(userAddress)
  // const [address, setAddress] = useState(userAddress);
  // const [mapAddress, setMapAddress] = useState(userAddress);

  // const handleShowMap = () => {
  //   setMapAddress(address);
  // };

  const encodedAddress = encodeURIComponent(userAddress);
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  // console.log(mapAddress);

  return (
    <div className="p-4">
      {/* <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleShowMap}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Show on Map
      </button> */}

      {/* {mapAddress && (
        <div className="mt-4">
          <iframe
            title="Google Map"
            width="100%"
            height="450"
            style={{ border: 0 }}
            src={embedUrl}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )} */}

      <div className="mt-4">
        <iframe
          title="Google Map"
          width="100%"
          height="450"
          style={{ border: 0 }}
          src={embedUrl}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default EmbeddedGoogleMap;
