import ErrorMessage from '@/components/ErrorMessage';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Props = {};

const TimelineCard = () => {
  return (
    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-green-400">
      <div className="w-40 h-40 relative">
        <Image src="logo.svg" alt="logo" fill />
      </div>
      <h3 className="text-xl font-semibold tracking-wide">
        Donec porta enim vel{' '}
      </h3>
      <time className="text-xs tracking-wide uppercase dark:text-gray-400">
        Dec 2020
      </time>
      <p className="mt-3">
        Pellentesque feugiat ante at nisl efficitur, in mollis orci scelerisque.
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
      </p>
    </div>
  );
};

const TimelineDay = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <ErrorMessage
        action={{ name: 'Sign In', func: signIn }}
        message="Please Login to View Food Intake History"
      />
    );
  }

  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <div className="grid gap-4 mx-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-green-400">
              <h3 className="text-3xl font-semibold">Morbi tempor</h3>
              <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">
                Vestibulum diam nunc
              </span>
            </div>
          </div>
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
              <TimelineCard />
              <TimelineCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DietHistory = (props: Props) => {
  return (
    <main>
      <TimelineDay />
      <TimelineDay />
    </main>
  );
};

export default DietHistory;
