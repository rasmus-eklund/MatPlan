"use client";
import { useEffect } from "react";
import { checkNewUser } from "../server-side/user";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

export default function Landing() {
  const { push } = useRouter();
  useEffect(() => {
    checkNewUser().then(() => {
      push("/menu");
    });
  }, [push]);

  return (
    <main className="bg-c4 grow flex justify-center items-center">
      <Loading />
    </main>
  );
}
