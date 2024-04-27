import CardInfo from "@/components/cardInfo";
import Image from "next/image";
import React from "react";

const About: React.FC = () => {
  return (
    <>
    <div className="w-full m-auto flex flex-row justify-center gap-12 px-36 bg-color4 pt-20 pb-12 rounded-b-3xl shadow-2xl">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-6xl text-color1 font-bold font-mono">About Us</h1>
      </div>
    </div>
    <div className="font-mono flex my-10 items-center justify-center">
      <CardInfo nama="Imanuel Sebastian Girsang" panggilan="Nuel" nim="13522058" imgPath="/nuel.jpg" />
      <CardInfo nama="Ahmad Mudabbir Arif" panggilan="Dab" nim="13522072" imgPath="/dabbir.jpg" />
      <CardInfo nama="Muhammad Neo Cicero Koda" panggilan="Neo" nim="13522108" imgPath="/neo.jpg" />
    </div>
    </>
  );
};

export default About;
