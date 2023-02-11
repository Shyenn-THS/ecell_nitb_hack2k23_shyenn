import { navLinks } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import jsCookie from 'js-cookie';
import { UIContext } from '@/context/UIContext';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';

// import {
//   useAddress,
//   useContract,
//   useDisconnect,
//   useMetamask,
// } from '@thirdweb-dev/react';

type Props = {};

const Navbar = (props: Props) => {
  // const connectWithMetamask = useMetamask();
  // const disconnect = useDisconnect();
  // const address = useAddress();

  const { state, dispatch } = useContext(UIContext);
  const { darkMode, openDrawer } = state;
  const { data: session } = useSession();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
    return () => {};
  }, [darkMode]);

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
                  className="flex items-center px-4 -mb-1 dark:border-transparent dark:text-green-400"
                  key={idx}
                  href={href}
                >
                  {name}
                </Link>
              );
            })}
          </ul>
          <div className="items-center lg:space-x-6 flex-shrink-0 hidden lg:flex">
            {dark ? (
              <BsFillSunFill
                className="text-lg"
                onClick={darkModeChangeHandler}
              />
            ) : (
              <BsMoonFill className="text-lg" onClick={darkModeChangeHandler} />
            )}

            {session ? (
              <div className="avatar avatar-ring avatar-sm">
                <div className="dropdown-container">
                  <div className="dropdown">
                    <div
                      className="btn relative btn-ghost cursor-pointer hover:bg-inherit"
                      tabIndex={0}
                    >
                      <Image
                        fill
                        className="object-cover"
                        src={session?.user?.image!}
                        alt={session?.user?.name!}
                      />
                    </div>
                    <div className="dropdown-menu dark:bg-gray-1000 dropdown-menu-bottom-left">
                      <Link
                        href={`/profile/${session?.user?.username!}`}
                        className="dropdown-item text-sm dark:hover:bg-gray-900"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/account-settings"
                        tabIndex={-1}
                        className="dropdown-item text-sm dark:hover:bg-gray-900"
                      >
                        Account settings
                      </Link>
                      <button
                        onClick={() => signOut()}
                        tabIndex={-1}
                        className="dropdown-item text-sm dark:hover:bg-gray-900"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="btn-rounded btn bg-green-800"
              >
                Sign In
              </button>
            )}
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
