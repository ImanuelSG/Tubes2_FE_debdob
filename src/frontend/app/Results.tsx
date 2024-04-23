"use client";

import MainForm from "@/components/InputForm/MainForm";
import DirectedGraph from "@/components/visualization/graph";
import { Response } from "@/lib/types";
import { useState } from "react";

const Result = () => {
  const [result, setResult] = useState<Response | null>(null);
  return (
    <div>
      <MainForm setResult={setResult} />
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
    </div>
  );
};

export default Result;
