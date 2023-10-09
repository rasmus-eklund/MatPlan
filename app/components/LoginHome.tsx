'use client';
import { signIn } from 'next-auth/react';

export default function Login() {
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
