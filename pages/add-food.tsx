import ErrorMessage from '@/components/ErrorMessage';
import NutrientsTable from '@/components/NutrientsTable';
import db from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/uploadImage';
import { Dish } from '@/types/typings';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState, useRef, useEffect, RefObject } from 'react';
import toast from 'react-hot-toast';
import PieChart from '../components/Charts/PieChart';

const AddImage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [mounted, setMounted] = useState<Boolean>(false);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();
  const hiddenFileInput = useRef<RefObject<HTMLInputElement>>();
  const [dish, setDish] = useState<Dish>();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setProcessing(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setStream(mediaStream);
      videoRef.current!.srcObject = mediaStream;
      videoRef.current?.play();
    } catch (error) {
      console.error('Error accessing webcam', error);
    } finally {
      setProcessing(false);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      setStream(null);
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

    setProcessing(true);

    const formData = new FormData();
    formData.append('image', image);
    let dishName = '';
    let dishImageUrl = await uploadToCloudinary(image!);

    try {
      await fetch('http://localhost:5000/identify', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          dishName = data.dish;
        });
    } catch (error) {
      console.error('Error sending image', error);
    } finally {
      setProcessing(false);
    }

    try {
      const q = query(collection(db, 'food'), where('name', '==', 'Chickpeas'));
      const querySnapshot = await getDocs(q);
      const dishSnap = querySnapshot.docs[0];

      if (dishSnap) {
        setDish(dishSnap.data());
      } else {
        // doc.data() will be undefined in this case
        toast.error('Something Went Wrong!');
      }

      const itemReportId = await addDoc(collection(db, 'itemReport'), {
        ...dishSnap.data(),
        image: dishImageUrl,
        date: new Date().toISOString(),
      });

      const userRef = doc(db, 'users', session?.user.email);
      await updateDoc(userRef, {
        foodIntakeHistory: arrayUnion(itemReportId),
      });

      toast.success('Sucessfuly made report for Item.');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (!session) {
    return (
      <ErrorMessage
        action={{ name: 'Sign In', func: signIn }}
        message="Please Login to Add Food Intake"
      />
    );
  }

  if (!mounted) {
    return <div className=""></div>;
  }

  return (
    <main className="">
      <div className="flex items-center w-3/4 h-96 mx-auto rounded-lg shadow-xl">
        <div className="w-1/2 bg-black h-full">
          {stream ? (
            <video ref={videoRef} className="w-full h-full" />
          ) : (
            <div className="w-full relative h-full ">
              <Image
                fill
                src={preview ? preview : '/assets/svg/Add Food.svg'}
                alt="Captured from webcam"
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="px-10 flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-gray-500 to-gray-300 h-full">
          <input
            onChange={handleChange}
            type="file"
            ref={hiddenFileInput}
            hidden
          />

          <h1 className="text-2xl">Upload your daily intake</h1>

          <div className="flex items-center py-6 space-x-4 w-full">
            {mounted && navigator.mediaDevices ? (
              <button
                className="btn bg-gray-700 whitespace-nowrap w-full"
                onClick={!stream ? startStream : stopStream}
              >
                {stream ? 'Stop Capture' : 'Start Capture'}
              </button>
            ) : null}
            <button
              onClick={captureImage}
              className="btn bg-gray-700 whitespace-nowrap w-full"
            >
              Capture Image
            </button>
            {preview && (
              <button
                className="btn btn-success whitespace-nowrap disabled:animate-pulse disabled:bg-opacity-70 disabled:cursor-not-allowed"
                onClick={sendImage}
                disabled={processing}
              >
                Submit
              </button>
            )}
          </div>

          <button
            className="btn bg-gradient-to-t from-green-700 to-green-800 shadow-md w-full whitespace-nowrap"
            onClick={handleClick}
          >
            Or Upload Image
          </button>
        </div>
      </div>

      {dish ? (
        <section className="p-10 space-y-4">
          <h1 className="text-4xl text-center text-semibold">Item Details</h1>
          <div className="p-6 space-y-8">
            <h2 className="text-2xl font-medium">
              Dish Name:{' '}
              <span className="font-light text-green-900">{dish.name}</span>
            </h2>
            <div className="grid grid-cols-4 gap-x-6 gap-y-4">
              <div className="flex flex-col justify-center items-center space-y-4">
                <PieChart lable="Calories" ci={dish?.calories} ri={8} />
                <h4>Calories</h4>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4">
                <PieChart
                  lable="Carbohydrate"
                  ci={dish?.carbohydrates}
                  ri={8}
                />
                <h4>Carbohydrate</h4>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4">
                <PieChart lable="Fat" ci={dish?.fat} ri={8} />
                <h4>Fat</h4>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4">
                <PieChart lable="Proteins" ci={dish?.proteins} ri={8} />
                <h4>Proteins</h4>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-8">
            <h2 className="text-2xl font-medium">Other Nutrients:</h2>
            <NutrientsTable data={dish?.nutrients} />
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default AddImage;
