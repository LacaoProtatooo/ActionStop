import React, { useState, useEffect } from "react";
import { Button, Divider, Stack, ListItem } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { BsBasket } from "react-icons/bs";

const FigurineModal = ({ images, details, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50); // Add slight delay for smoother animation
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <button
    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
    onClick={onClose}
    aria-label="Close"
  >
    &times;
  </button>
  <div
    className={`relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 transform transition-all duration-500 ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`}
  >
    <div className="grid grid-cols-3 gap-4 mb-4">
      {/* Carousel Section */}
      <div className="relative w-full h-64 overflow-hidden mb-4 col-span-1">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
        >
          &gt;
        </button>
      </div>

      {/* Description and Buttons Section */}
      <div className="col-span-2 grid gap-4 mb-4 overflow-y-auto max-h-[70vh]">
        {/* Description Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Name</h2>
          <p className="text-gray-700 mb-2">Origin: </p>
          <p className="text-gray-700 mb-2">Classification: </p>
          <p className="text-lg font-semibold">Price: ${details?.price || "0.00"}</p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col justify-start gap-4 bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-2">Manufacturer</h2>
              <p className="text-gray-700 mb-2">Country: {details?.origin || "N/A"}</p>
            </div>
            <div className="flex justify-end items-center col-span-1">
              <div className="flex flex-col gap-4">
                <Button variant="outlined" startIcon={<StorefrontIcon />}>
                  Buy
                </Button>
                <Button variant="outlined" startIcon={<BsBasket />}>
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-center bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Reviews</h2>
    </div>
    <div className="flex justify-center bg-gray-100 p-4 rounded-lg mt-4 max-h-[30vh] overflow-y-auto">
      <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={5}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4</ListItem>
      </Stack>
    </div>
  </div>
</div>

  );
};

export default FigurineModal;