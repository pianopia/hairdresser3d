'use client';
import { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import ThreeDModel from './components/ThreeDModel';

export default function Home() {
  //const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">360° 3D Model Demo</h1>
      <div className="flex justify-center">
        /*{selectedImage ? (
          <ThreeDModel textureUrl={selectedImage} />
        ) : (
          <CameraCapture />
        )}*/
        <CameraCapture />
      </div>
    </div>
  );
}

