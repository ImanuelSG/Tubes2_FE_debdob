"use client";

import MainForm from "@/components/InputForm/MainForm";
import PathCard from "@/components/pathCard";
import { Button } from "@/components/ui/button";
import DirectedGraph from "@/components/visualization/graph";
import { Response } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Result = () => {
  const [result, setResult] = useState<Response | null>(null);
  const [paths, setPaths] = useState<string[][]>([]);
  const [showPaper, setShowPaper] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePaper = () => {
    setShowPaper(!showPaper);
  };

  return (
    <main className="flex h-full flex-col items-center gap-8">
      <div className="z-10 py-24 flex w-full items-center justify-center font-mono text-sm bg-color3 rounded-b-[4rem] shadow-xl lg:flex">
        <MainForm
          setResult={setResult}
          setLoading={setLoading}
          setShowPaper={setShowPaper}
          setPaths={setPaths}
        />
      </div>
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="relative">
          <div
            className={`flex flex-col items-center justify-center top-0 transform transition-transform duration-500 ${showPaper ? "translate-y-0" : "-translate-y-full"}`}
          >
            <div className="mx-auto min-w-[60vw] w-[60vw] min-h-[80vh] bg-white shadow-2xl">
              {loading ? (
                <div className="fixed flex flex-col gap-4 items-center justify-center w-full h-full -translate-y-4">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-color1"></div>
                  <h3 className="font-mono text-xl text-color1">Loading...</h3>
                </div>
              ) : result ? (
                <div className="flex flex-col items-center gap-10 my-8">
                  <div className="relative w-11/12">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-3 translate-y-3"></div>
                    <div className="relative h-full border-4 border-black bg-white">
                      <p className="font-mono text-2xl px-4">Name : {result.nodes[0].label} - {result.nodes[result.nodes.length - 1].label}</p>
                    </div>
                  </div>
                  <p className="text-2xl max-w-[90%] text-center text-black font-mono">
                    Found <strong>{result.resultNum}</strong> results in{" "}
                    <strong>{result.timeTaken} ms</strong> with a depth of
                    separation of <strong>{result.resultDepth}</strong> by
                    visiting <strong>{result.resultVisited}</strong> articles.
                  </p>
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-3 translate-y-3"></div>
                    <div className="relative border-4 border-black">
                      <DirectedGraph
                        nodes={result.nodes}
                        links={result.edges}
                        levelNum={result.levelNum}
                      />
                    </div>
                  </div>
                  <div className="relative flex flex-row gap-10 justify-center">
                    <div className="relative w-1/3">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-3 translate-y-3"></div>
                      <div className="relative border-4 border-black bg-color2">
                        <Image
                          src="/assets/graph.gif"
                          alt="graph"
                          className="inset-0 w-full h-full object-fit grayscale"
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>
                    <div className="relative w-1/4">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-3 translate-y-3"></div>
                      <div className="relative h-full border-4 border-black bg-white">
                        <p className="font-mono text-2xl px-4 py-2">Score :</p>
                        <p className="font-mono text-center text-[3rem] px-4 py-2">{result.resultNum}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <Button
              onClick={togglePaper}
              className="px-auto items-center text-muted py-3 px-4 rounded"
            >
              {showPaper ? "Close Paper" : "Open Paper"}
            </Button>
          </div>
            <div className={`relative flex flex-col items-center mb-6 transition-transform duration-500} ${showPaper && result && !loading ? "block" : "hidden"}`}>
              <p className="font-mono left-0 my-4 font-bold text-3xl px-4">
                Individual Path :
              </p>
              <div className="relative w-11/12 flex flex-wrap items-center justify-center gap-6">
                {paths.map((path: any, index: any) => {
                  return <PathCard paths={path} key={index} />;
                })}
              </div>
            </div>

        </div>
      </div>
    </main>
  );
};

export default Result;
