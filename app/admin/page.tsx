"use client";
import { useState } from "react";

const Page = () => {
  const [s, setS] = useState("");
  const className = "h-10 w-10 border-2 border-1";
  return (
    <main className="bg-c4 p-5 grow flex flex-col gap-5 overflow-y-auto">
      <input type="text" value={s} onChange={(e) => setS(e.target.value)} />

      <div className="flex bg-c1">
        {['c1', 'c2', 'c3', 'c4', 'c5'].map((i) => {
          return <div key={i} className={className + `bg-${i}`}></div>;
        })}
      </div>
    </main>
  );
};

export default Page;
