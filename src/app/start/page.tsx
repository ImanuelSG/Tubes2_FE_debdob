"use client";

import generateDAGData from "@/lib/generateDAGData";
import Result from "../Results";
import DirectedGraph from "@/components/visualization/graph";

const paths = [
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Relativy_theory",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Memory",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Other",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Hoho",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/Abednego",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Books",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/nuel",
    "https://en.wikipedia.org/wiki/Physics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/neo",
    "https://en.wikipedia.org/wiki/Phsyics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/dabbir",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/asdfasd",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/qprs",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/lmno",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hijk",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/efgh",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/abcd",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoU",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoT",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoS",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoR",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoQ",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoP",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoO",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoN",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoM",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoL",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoK",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoJ",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoI",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoH",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoG",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoF",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoE",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoD",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoC",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoB",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],
  [
    "https://en.wikipedia.org/wiki/Albert_Einstein",
    "https://en.wikipedia.org/wiki/hohoA",
    "https://en.wikipedia.org/wiki/Mathematics",
    "https://en.wikipedia.org/wiki/Calculus",
    "https://en.wikipedia.org/wiki/AI",
    "https://en.wikipedia.org/wiki/AB",
    "https://en.wikipedia.org/wiki/AC",
    "https://en.wikipedia.org/wiki/AD",
  ],

];

export default function Start() {
  // const { nodes, Edges, numNodeLevel } = generateDAGData(paths);
  return <Result />;
  // return <DirectedGraph nodes={nodes} links={Edges} levelNum={numNodeLevel} />;
}
