import ErrorMessage from '@/components/ErrorMessage';
import { useAddress, useMetamask } from '@thirdweb-dev/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {};

type UserDetails = {
  fname: string;
  lname: string;
  email: string;
  age: number;
  phone: string;
  gender: 'male' | 'female';
  bio: string;
};

const Profile = (props: Props) => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const hiddenFileInput = useRef();
  const [preview, setPreview] = useState<string | undefined>();
  const [image, setImage] = useState<File>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserDetails>();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  }

  if (!address) {
    return (
      <ErrorMessage
        message="Please Connect Your Wallet To Continue"
        action={{ name: 'Conncet To Wallet', func: connectWithMetamask }}
      />
    );
  }

  const onSubmit = async (data: UserDetails) => {
    const dataToSend = {
      ...data,
      image: image ? await uploadToCloudinary(image!) : '',
      address: session?.user?.email,
    };

    const res = await axios.post('/api/updateUser', dataToSend);
    if (res.status === 200) {
      toast.success('Profile Updated Sucessfully!');
    } else {
      toast.error(res.data.error);
    }
  };

  return (
    <main>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci fuga autem eum!
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm">
                  First name
                </label>
                <input
                  {...register('fname')}
                  type="text"
                  placeholder="First name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Last name
                </label>
                <input
                  {...register('lname')}
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Phone
                </label>
                <input
                  {...register('phone')}
                  type="phone"
                  placeholder="+91XXXXXXXXXX"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Wallet Address
                </label>
                <input
                  type="text"
                  disabled
                  value={address ? address : 'Wallet Not Connected'}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              {/* <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="state" className="text-sm">
                  State / Province
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="zip" className="text-sm">
                  ZIP / Postal
                </label>
                <input
                  id="zip"
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div> */}
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Profile</p>
              <p className="text-xs">Adipisci fuga autem eum!</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="username" className="text-sm">
                  Age
                </label>
                <input
                  {...register('age')}
                  type="number"
                  min={6}
                  max={100}
                  placeholder="Username"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="website" className="text-sm">
                  Gender
                </label>
                <select
                  {...register('gender')}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                >
                  <option value="Not Selected" disabled selected>
                    Not Selected
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  placeholder="Something About You...."
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                ></textarea>
              </div>
              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Photo
                </label>
                <div className="flex items-center space-x-2">
                  <Image
                    src={preview ? preview : '/assets/png/profile.png'}
                    alt=""
                    className="rounded-full dark:bg-gray-500 object-cover"
                    height={40}
                    width={40}
                  />
                  <input
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    type="file"
                    accept="jpg, png, jpeg"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-md dark:border-gray-100"
                    onClick={handleClick}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
          <button
            type="submit"
            className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 w-fit mx-auto"
          >
            Basic
          </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
