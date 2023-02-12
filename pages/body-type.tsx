import ErrorMessage from '@/components/ErrorMessage';
import { charecteristics } from '@/data/charecteristics';
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
    // const dataToSend = {
    //   ...data,
    //   email: session?.user?.email,
    //   username: session?.user?.username,
    // };

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
              <p className="font-medium">Personal Charecteristics</p>
              <p className="text-xs">
                Fill your personal charecteristics that will help us identify
                your ayurvedic body type.
              </p>
            </div>
            <form className="grid grid-cols-2 gap-4 col-span-full lg:col-span-3">
              {Object.keys(charecteristics).map((key, idx) => {
                return (
                  <div
                    key={idx}
                    className="col-span-full flex items-center justify-between"
                  >
                    <label htmlFor="firstname" className="text-sm space-x-2">
                      {key.split('_').map((val, idx) => {
                        return <span key={idx}>{val.toUpperCase()}</span>;
                      })}
                    </label>
                    <select
                      className="w-80 px-4 py-2"
                      key={idx}
                      {...register(key)}
                    >
                      {charecteristics[key].map((opt, idx) => {
                        return (
                          <option
                            className=""
                            key={idx}
                            value={idx === 0 ? 'v' : idx === 1 ? 'p' : 'k'}
                          >
                            {opt}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </form>
          </fieldset>

          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-tr from-gray-500 to-gray-200 shadow-lg font-semibold rounded dark:bg-gray-100 dark:text-gray-800 w-fit mx-auto"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default BodyType;
