import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Result from "./Results";

export default function Home() {
  return (
    <main className="font-mono flex min-h-screen flex-col items-center">
      <div className="w-full my-auto flex flex-row gap-12 px-36">
        <div className="w-1/2 flex flex-col items-start justify-center gap-8">
          <h1 className="text-6xl text-[#393E46] font-bold">Find The Path</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
            dicta iusto error explicabo tempora voluptatibus quis ut velit
            blanditiis. Tenetur expedita minus id voluptatum itaque? Ratione
            porro eaque odio sapiente quasi autem obcaecati asperiores molestiae
            neque.
          </p>
          <Link
            href="/start"
            className="bg-[#393E46] px-12 py-4 text-lg text-white"
          >
            Get Started
          </Link>
        </div>
        <div className="w-1/2">
          <div className="w-full h-[70vh] bg-[#8c9099] rounded-bl-[10rem] relative">
            {/* <Image src="/assets/graph.gif" alt="graph" className="absolute inset-0 w-full h-full object-fit grayscale" width={500} height={500}/> */}
          </div>
        </div>
      </div>
      
    </main>
  );
}
