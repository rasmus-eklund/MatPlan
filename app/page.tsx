"use client";
import { useEffect } from "react";
import Image from "next/image";
import LoginHome from "./components/layout/LoginHome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const { data: session } = useSession();
  const { push } = useRouter();
  useEffect(() => {
    if (session) {
      push("/home");
    }
  }, [session, push]);

  return (
    <>
      <div className="flex flex-col items-center bg-c3/60 z-10 p-10 gap-5">
        <h1 className="font-bold text-2xl text-center text-c5">
          Välkommen till MatPlan!
        </h1>
        <p className="text-xl text-center text-c5 font-bold">
          Planera måltider, förenkla inköpslistor och effektivisera dina
          matinköp.
        </p>
        <div>
          <LoginHome />
        </div>
      </div>

      <Image
        className="h-full w-full"
        src="/bgimage_sm.jpg"
        alt="background image"
        layout="fill"
        objectFit="cover"
      />
    </>
  );
}
