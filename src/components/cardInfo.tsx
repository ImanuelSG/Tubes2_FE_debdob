import Image from "next/image";

interface CardInfoProps {
  nama: string;
  panggilan: string;
  nim: string;
  imgPath: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ nama, panggilan, nim, imgPath }) => {
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-between py-8 w-[30vw] min-h-[60vh] bg-white shadow-2xl">
        <div className="relative w-11/12">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-black translate-x-3 translate-y-3"></div>
          <div className="relative h-full border-4 border-black bg-white">
            <p className="font-mono text-2xl text-center px-4">{panggilan}</p>
          </div>
        </div>
        <div className="w-[400px] h-[400px] flex items-center justify-center">
            <Image
              src={imgPath}
              alt="graph"
              className="inset-0 max-w-full max-h-full p-6 object-cover"
              width={400}
              height={400}
            />
        </div>
        <div className="flex flex-col font-mono gap-6"></div>
        <div className="relative shadow-lg w-11/12">
          <div className="absolute top-0 left-0 max-w-1/4 w-full h-full border-4 border-black translate-x-3 translate-y-3"></div>
          <div className="relative flex flex-row h-full w-full border-4 py-2 px-4 border-black bg-white gap-4">
            <div className="flex flex-col w-full">
              <div className="flex font-mono text-md border-b-2 border-color2">
                <h1 className="bg-opacity-30 w-full">Name : {nama}</h1>
                <br />
              </div>
              <div className="flex font-mono text-md border-b-2 border-color2">
                <h1 className="bg-opacity-30 w-full">NIM  : {nim}</h1>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
