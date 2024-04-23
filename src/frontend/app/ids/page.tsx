import React from 'react';

const IDS: React.FC = () => {
  return (
    <main className="font-mono flex min-h-screen flex-col items-center px-24">
      <div className="w-full m-auto flex flex-row gap-12 px-36 bg-[#F7F7F7] p-24 rounded-3xl shadow-xl">
        <div className="w-1/2 flex flex-col items-start justify-center gap-10">
          <h1 className="text-6xl text-[#393E46] font-bold">Iterative Deepening Search (IDS)</h1>
          <p className="text-lg">IDS merupakan algoritma hibrida yang menggabungkan aspek DFS (Depth-First Search) dan BFS. Algoritma ini melakukan DFS berulang kali dengan batas kedalaman yang semakin besar hingga solusi ditemukan.</p>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl text-[#393E46] font-bold">Kelebihan IDS:</h1>
          <ul>
            <li className="text-lg">1. IDS menjamin menemukan solusi terpendek pertama kali.</li>
            <li className="text-lg">2. IDS akan menemukan solusi terpendek jika semua edge memiliki bobot yang sama.</li>
          </ul>
          <h1 className="text-3xl text-[#393E46] font-bold">Kekurangan IDS:</h1>
          <ul>
            <li className="text-lg">1. IDS tidak efisien jika semua edge memiliki bobot yang sama.</li>
            <li className="text-lg">2. IDS tidak efisien jika kedalaman maksimum yang diberikan tidak cukup dalam.</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default IDS;