'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserCard from './UserCard';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center text-xl text-4 p-4 rounded-md bg-3 border-1 font-bold bg-opacity-60 ">
        <button
          className="text-end text-1 px-6"
          onClick={async () => await signOut({ callbackUrl: '/' })}
          type="button"
        >
          Logga ut
        </button>
      </div>
    );
  } else {
    return (
      <div className="text-center text-xl text-4 p-4 rounded-md bg-3 border-1 font-bold bg-opacity-60 ">
        <button
          className="text-end text-1 px-6"
          onClick={() => {
            signIn('google', { callbackUrl: '/menu' });
          }}
          type="button"
        >
          Logga in
        </button>
      </div>
    );
  }
}
