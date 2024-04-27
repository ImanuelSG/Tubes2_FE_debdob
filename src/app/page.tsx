import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Result from "./Results";

export default function Home() {
  return (
    <main className="font-mono flex min-h-screen flex-col items-center">
      <div className="w-full my-auto flex flex-row gap-12 px-36">
        <div className="w-1/2 flex flex-col items-start justify-center gap-8">
          <h1 className="text-6xl text-color1 font-bold">Find The Path</h1>
          <p className="text-lg">
            DebDob adalah sebuah platform web yang menawarkan pengalaman
            penjelajahan yang menarik dan mendidik, mirip dengan konsep
            permainan Wikirace. Dalam permainan ini, pengguna diberi tantangan
            untuk mencari jalur terpendek antara dua topik Wikipedia yang
            berbeda menggunakan tautan antarartikel.
          </p>
          <Link
            href="/start"
            className="bg-color1 px-12 py-4 text-lg text-white shadow-xl hover:bg-color2"
          >
            Get Started
          </Link>
        </div>
        <div className="w-1/2">
          <div className="w-full h-[70vh] bg-color2 rounded-bl-[10rem] relative shadow-xl">
            {/* <Image src="/assets/graph.gif" alt="graph" className="absolute inset-0 w-full h-full object-fit grayscale" width={500} height={500}/> */}
          </div>
        </div>
      </div>
    </main>
  );
}
