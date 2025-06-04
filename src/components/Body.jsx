import React from 'react';
import { DOGS_IMG_URL } from '../utils/constants';
import ImageUpload from './ImageUpload';

function Body() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-6 py-12 md:py-16">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-6">
              Identify dog breeds using <span className="text-blue-600">AI</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Below is a free classifier to identify dog breeds. Just upload your image,
              and our AI will predict which breed it is – in just seconds.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={DOGS_IMG_URL}
              alt="Dog breeds"
              className="rounded-xl shadow-lg w-full max-w-sm md:max-w-md"
            />
          </div>

        </div>
      </div>

      {/* Image Upload Section */}
      <div className="flex justify-center px-6 pt-0  pb-12 md:pb-16">
        <div className="w-full max-w-md">
          <ImageUpload />
        </div>
      </div>
    </div>
  );
}

export default Body;
