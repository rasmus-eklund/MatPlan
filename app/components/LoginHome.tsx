'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center text-xl text-4 p-4 rounded-md bg-1 border-1 font-bold bg-opacity-90 ">
        <button
          className="text-end text-4 px-6"
          onClick={async () => await signOut({ callbackUrl: '/' })}
          type="button"
        >
          Logga ut
        </button>
      </div>
    );
  } else {
    return (
      <div className="text-center text-xl text-4 p-4 rounded-md bg-1 border-1 font-bold bg-opacity-90 ">
        <button
          className="text-end text-4 px-6"
          onClick={() => {
            signIn('google', { callbackUrl: '/home' });
          }}
          type="button"
        >
          Logga in
        </button>
      </div>
    );
  }
}
