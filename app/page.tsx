"use client";
import React from "react";
import Image from "next/image";
import LoginHome from "./components/LoginHome";
import HeaderHome from "./components/HeaderHome";
export default function Landing() {
  return (<>
    <main className="w-full h-96 flex justify-center flex-col items-center text-5">
      <h1 className="font-bold text-2xl">Welcome to Recipe JAR
      </h1>
      <h3 className="text-lg mb-2">
          Plan meals, create shopping lists, and simplify your culinary journey.
          </h3> 
      <LoginHome />
      

      <Image
        src="/bg_image.png"
        alt="background image"
        layout="fill"
        objectFit="cover" 
        objectPosition="center center"
        style={{ pointerEvents: 'none', opacity: 0.6, zIndex: -1 }}
      />

    </main>
    </>
  );
}
