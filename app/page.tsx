"use client";
import React, { useEffect } from "react";
import { checkNewUser } from "./db/user";

export default function Landing() {
  // useEffect(() => {
  //   (async () => await checkNewUser())();
  // }, []);
  return (
    <main>
      <h1>Welcome to Recipe JAR</h1>
      <h1>Log In PAGE</h1>
    </main>
  );
}
