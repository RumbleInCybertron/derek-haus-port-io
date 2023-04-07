import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

interface AppbarProps { }

const Appbar: React.FC<AppbarProps> = () => {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center py-2 px-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-lg font-bold">Logo</span>
        </Link>
        <Link href="/">
          <span className="text-gray-500 hover:text-gray-900">Home</span>
        </Link>
        <Link href="/assets">
          <span className="text-gray-500 hover:text-gray-900">Assets</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        {session ? (
          <>
            <button
              type="button"
            >
              Profile {<FiUser className="ml-1" />}
            </button>
            <button
              type="button"
              onClick={() => signOut()}
            >
              Logout {<FiLogOut className="ml-1"/>}
            </button>
            <Image
              src={session?.user?.image || "/user.svg"}
              alt={session?.user?.name!}
              className="w-8 h-8 rounded-full"
              width="100"
              height="100"
            />
          </>
        ) : (
          <Link href="/signin">
            <span className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">
              Sign In
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Appbar;
