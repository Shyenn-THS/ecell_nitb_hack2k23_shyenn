import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const AddImage = () => {
  const [src, setSrc] = useState(null);
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (!hasCamera) {
      return;
    }

    const startStream = async () => {
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
    startStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [hasCamera]);

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
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
        {hasCamera && (
          <>
            <video
              ref={videoRef}
              style={{
                width: 700,
                height: 700,
              }}
            />
          </>
        )}
      </div>
      <div className="px-10 flex flex-col justify-center items-center ">
        <Image
          width={500}
          height={500}
          src={src ? src : ''}
          alt="Captured from webcam"
        />
        <div className="flex items-center py-6 space-x-8">
          {typeof navigator !== 'undefined' && navigator.mediaDevices && (
            <button
              className="btn btn-success"
              onClick={() => setHasCamera(true)}
            >
              Enable camera
            </button>
          )}
          <button onClick={captureImage} className="btn btn-success">
            Capture Image
          </button>
          {src && (
            <button className="btn btn-success" onClick={sendImage}>
              Submit
            </button>
          )}
        </div>
        {/* {src ? <img src={src} alt="Captured from webcam" /> : null} */}
      </div>
    </div>
  );
};

export default AddImage;
