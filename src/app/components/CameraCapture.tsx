import { useRef, useState, useEffect } from 'react';

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);

  // カメラ映像を取得
  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    startCamera();
  }, []);

  // 画像をキャプチャ
  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImages((prev) => [...prev, imageUrl]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay className="rounded-lg shadow-lg w-full max-w-md" />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={captureImage}
      >
        Capture Image
      </button>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {capturedImages.map((image, index) => (
          <img key={index} src={image} alt={`Capture ${index}`} className="w-24 h-24 object-cover" />
        ))}
      </div>
    </div>
  );
};

export default CameraCapture;

