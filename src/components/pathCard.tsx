import React from "react";
import Link from "next/link";
import { extractLabelFromLink } from "@/lib/generateDAGData";

interface PathCardProps {
  paths: string[];
}

const PathCard: React.FC<PathCardProps> = ({ paths }) => {
  return (
    <div className="relative shadow-lg">
      <div className="absolute top-0 left-0 max-w-1/4 w-full h-full border-4 border-black translate-x-3 translate-y-3"></div>
      <div className="relative h-full w-[20vw] border-4 py-2 px-4 border-black bg-white">
        {paths.map((link, index) => {
          const title = extractLabelFromLink(link)
          return (
            <div key={index} className="flex font-mono text-md border-b-2 border-color2 hover:bg-color2 hover:bg-opacity-30">
              <p>{index+1}. </p>
              <Link href={link} className="bg-opacity-30 w-full">{title}</Link>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathCard;
