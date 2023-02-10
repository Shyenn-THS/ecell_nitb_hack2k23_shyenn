import { navLinks } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  useAddress,
  useContract,
  useDisconnect,
  useMetamask,
} from '@thirdweb-dev/react';

type Props = {};

const Navbar = (props: Props) => {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <div>
      <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex items-center justify-between h-16 mx-auto">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="w-1/3"
              width={500}
              height={300}
            />
          </Link>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {navLinks.map((link, idx) => {
              const { name, href } = link;
              return (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-green-400 dark:border-green-400"
                  key={idx}
                  href={href}
                >
                  {name}
                </Link>
              );
            })}
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <button className="self-center px-8 py-3 rounded">0 FDT</button>
            <button
              onClick={address ? disconnect : connectWithMetamask}
              className="self-center px-8 py-3 font-semibold rounded dark:bg-green-400 dark:text-gray-900"
            >
              {address ? 'Connect To Wallet' : 'Disconnect'}
            </button>
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
