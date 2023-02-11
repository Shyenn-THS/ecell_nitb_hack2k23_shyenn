import Image from 'next/image';
import React, { useState, useRef, useEffect, RefObject } from 'react';

const AddImage = () => {
  const videoRef = useRef<HTMLVideoElement>();
  const [hasCamera, setHasCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [mounted, setMounted] = useState<Boolean>(false);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();
  const hiddenFileInput = useRef<RefObject<HTMLInputElement>>();
  const [dishName, setDishName] = useState<string>();

  const handleClick = () => {
    hiddenFileInput?.current.click();
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  }

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
    setPreview(canvas.toDataURL('image/png'));
  };

  const sendImage = async () => {
    if (!preview) {
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      await fetch('http://localhost:5000/identify', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setDishName(data.dish);
        });
    } catch (error) {
      console.error('Error sending image', error);
    }
  };

  return (
    <main>
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
          <div className="w-full relative h-96 ">
            <Image
              fill
              src={preview ? preview : '/assets/svg/Add Food.svg'}
              alt="Captured from webcam"
              className="cursor-pointer object-cover"
              onClick={handleClick}
            />
          </div>
          <input
            onChange={handleChange}
            type="file"
            ref={hiddenFileInput}
            hidden
          />
          <div className="flex items-center py-6 justify-between w-full">
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
            {preview && (
              <button
                className="btn btn-success whitespace-nowrap"
                onClick={sendImage}
              >
                Submit
              </button>
            )}
          </div>

          <button
            className="btn btn-warning w-full whitespace-nowrap"
            onClick={sendImage}
          >
            Or Upload Image
          </button>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold">Dish Name: {dishName}</h2>
      </section>
    </main>
  );
};

export default AddImage;
