import ErrorMessage from '@/components/ErrorMessage';
import { UserDetails } from '@/types/typings';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {};

const BodyType = (props: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserDetails>();

  const { data: session } = useSession();

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

  //   useEffect(() => {
  //     setValue('fname', session?.user.fname);
  //     setValue('lname', session?.user.lname);
  //     setValue('bio', session?.user.bio);
  //     setValue('gender', session?.user.gender);
  //     setValue('age', session?.user.age);
  //     setValue('email', session?.user.email);
  //     setPreview(session?.user.image);
  //   }, []);

  if (!session) {
    return (
      <ErrorMessage
        message="Please Login To Continue"
        action={{ name: 'Login', func: signIn }}
      />
    );
  }

  const onSubmit = async (data: UserDetails) => {
    const dataToSend = {
      ...data,
      email: session?.user?.email,
      username: session?.user?.username,
    };

    try {
    } catch (error) {
      console.error(error);
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
                Add or update your personal information.
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
                  disabled
                  placeholder="Email"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-900 px-4 py-2"
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800 w-fit mx-auto"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default BodyType;
