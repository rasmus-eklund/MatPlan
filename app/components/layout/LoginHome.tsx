"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="text-center text-xl text-c2 p-4 rounded-md bg-c5 border-1 font-bold bg-opacity-90 ">
      <button
        className="text-end text-4 px-6"
        onClick={() => {
          signIn("google", { callbackUrl: "/home" });
        }}
        type="button"
      >
        Logga in
      </button>
    </div>
  );
};

export default Login;
