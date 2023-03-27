import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div>
      <Link
        href="/"
        className="inline-block font-bold mr-1 no-underline"
      >
        <span className="font-bold text-secondary">
          Stocks
        </span>
      </Link>
      <Link
        href="/create"
        className="font-bold"
      >
        <span>
          Add Stock
        </span>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="inline-block font-bold mr-1 no-underline">
        <Link
          href="/"
          className="font-bold"
        >
          <span className="font-bold text-secondary">Stocks</span>
        </Link>
        <Link
          href="/create"
          className="font-bold"
        >
          <span>Add Stock</span>
        </Link>
      </div>
    );
    right = (
      <div className="mx-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="mx-auto inline-block font-bold mr-1 no-underline">
        <Link
          href="/api/auth/signin"
          className="font-bold"
        >
          <span>Log in</span>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div>
        <Link
          href="/"
          className="inline-block font-bold mr-1 no-underline"
        >
          <span className="font-bold text-secondary">Stocks</span>
        </Link>
        <Link
          href="/create"
          className="font-bold"
        >
          <span>Add Stock</span>
        </Link>
        <Link
          href="/drafts"
        >
          <span>Unfinished</span>
        </Link>
      </div>
    );
    right = (
      <div className="mx-auto inline-block font-bold mr-1 no-underline">
        <p>
          {session?.user?.name} ({session?.user?.email})
        </p>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <div className="flex-auto p-2 items-center">
      {left}
      {right}
    </div>
  );
};
export default Header;
