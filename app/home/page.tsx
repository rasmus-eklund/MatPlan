"use client";
import { useEffect } from "react";
import { checkNewUser } from "../db/user";
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
    <main className="bg-2 grow flex justify-center items-center">
      <Loading />
    </main>
  );
}
