import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const AddImage = () => {
  const [src, setSrc] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>();
  const [hasCamera, setHasCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [mounted, setMounted] = useState<Boolean>(false);

  const startStream = async () => {
    if (!videoRef.current) return;
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing webcam', error);
    }
  };

  useEffect(() => {
    if (!hasCamera) {
      return;
    }

    startStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [hasCamera]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas?.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    if (canvas == null) throw new Error('Could not get canvas');
    setSrc(canvas.toDataURL('image/png'));
  };

  const sendImage = async () => {
    if (!src) {
      return;
    }

    const formData = new FormData();
    formData.append('image', src.split('base64,')[1]);

    try {
      const response = await fetch('http://localhost:5000/identify', {
        method: 'POST',
        body: formData,
      });
      console.log('Image sent successfully', response);
    } catch (error) {
      console.error('Error sending image', error);
    }
  };

  return (
    <div className="flex items-center">
      <div className="px-10">
        {hasCamera ? (
          <video
            ref={videoRef}
            style={{
              width: 700,
              height: 700,
            }}
            controls={false}
            autoPlay={true}
            loop={true}
            src="/assets/mp4/food.mp4"
          />
        ) : null}
      </div>
      <div className="px-10 flex flex-col justify-center items-center ">
        <Image
          width={500}
          height={500}
          src={src ? src : '/assets/svg/Add Food.svg'}
          alt="Captured from webcam"
        />
        <div className="flex items-center py-6 space-x-4">
          {mounted && navigator.mediaDevices ? (
            <button
              className="btn btn-success whitespace-nowrap"
              onClick={() => (hasCamera ? startStream() : setHasCamera(true))}
            >
              Start Capture
            </button>
          ) : null}
          <button
            onClick={captureImage}
            className="btn btn-success whitespace-nowrap"
          >
            Capture Image
          </button>
          <button
            onClick={stopCapture}
            className="btn whitespace-nowrap btn-error"
          >
            Stop Capture
          </button>
          {src && (
            <button
              className="btn btn-success whitespace-nowrap"
              onClick={sendImage}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddImage;
