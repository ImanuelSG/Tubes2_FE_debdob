import MainForm from "@/components/InputForm/MainForm";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import InputContent from "@/components/inputContent";
import DirectedGraph from "@/components/visualization/graph";
import generateDAGData from "@/lib/generateDAGData";

const paths = [
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Relativy_theory",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Memory",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Other",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Abednego",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
  ],
];

export default function Start() {
  const { nodes, Edges } = generateDAGData(paths);
  console.log(nodes, Edges);
  return (
    <main className="flex min-h-screen flex-col items-center gap-8">
      <div className="z-10 py-24 flex w-full items-center justify-center font-mono text-sm bg-[#EEEEEE] bg-opacity-90 rounded-b-[4rem] shadow-xl lg:flex">
        <MainForm />
      </div>
      <DirectedGraph nodes={nodes} links={Edges} levelNum={[]} />
    </main>
  );
}
