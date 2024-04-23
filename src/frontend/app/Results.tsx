"use client";

import MainForm from "@/components/InputForm/MainForm";
import DirectedGraph from "@/components/visualization/graph";
import { Response } from "@/lib/types";
import { useState } from "react";

const Result = () => {
  const [result, setResult] = useState<Response | null>(null);
  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <div className="z-10 py-24 flex w-full items-center justify-center font-mono text-sm bg-[#EEEEEE] bg-opacity-90 rounded-b-[4rem] shadow-xl lg:flex">
        <MainForm setResult={setResult} />
      </div>
      {result && (
        <div className="flex flex-col gap-10">
          <p className="text-2xl text-black">
            Time taken: {result.timeTaken} ms | Result depth:{" "}
            {result.resultDepth}| Total result: {result.resultNum}
          </p>
          <DirectedGraph
            nodes={result.nodes}
            links={result.edges}
            levelNum={result.levelNum}
          />
        </div>
      )}
    </main>
  );
};

export default Result;
