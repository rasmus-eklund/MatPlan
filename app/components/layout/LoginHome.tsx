"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <button
      className="text-c2 text-3xl bg-c5/80 rounded-md hover:bg-c4 p-2 px-6"
      onClick={() => {
        signIn("google", { callbackUrl: "/home" });
      }}
    >
      Logga in
    </button>
  );
};

export default Login;
