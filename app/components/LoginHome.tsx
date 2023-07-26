'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserCard from './UserCard';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="text-center text-xl text-4 p-4 rounded-md bg-1 border-1 font-bold">
          <button
            className="text-end text-4"
            onClick={async () => await signOut({ callbackUrl: '/' })}
            type="button"
          >
            Logga ut
          </button>
         
        </div>
      </>
    );
  } else {
    return (
      <>
        <button
          className="text-center text-xl p-4 rounded-md text-4 bg-1 border-1 font-bold"
          onClick={() => {
            signIn('google', { callbackUrl: '/home' });
          }}
          type="button"
        >
          Logga in
        </button>
      </>
    );
  }
}
