import React from 'react';

const BFS: React.FC = () => {
  return (
    <main className="font-mono flex min-h-screen flex-col items-center px-24">
      <div className="w-full m-auto flex flex-row gap-12 px-36 bg-color4 p-24 rounded-3xl shadow-2xl">
        <div className="w-1/2 flex flex-col items-start justify-center gap-10">
          <h1 className="text-6xl text-[#393E46] font-bold">Breadth-First Search (BFS)</h1>
          <p className="text-lg">BFS merupakan algoritma pencarian yang mengeksplorasi graf secara level demi level. Algoritma ini dimulai dari simpul awal dan mengunjungi semua simpul tetangganya sebelum melanjutkan ke level selanjutnya. Proses ini diulang hingga solusi ditemukan atau semua simpul telah dijelajahi.</p>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl text-[#393E46] font-bold">Kelebihan BFS:</h1>
          <ul>
            <li className="text-lg">1. BFS menjamin menemukan solusi terpendek pertama kali.</li>
            <li className="text-lg">2. BFS akan menemukan solusi terpendek jika semua edge memiliki bobot yang sama.</li>
          </ul>
          <h1 className="text-3xl text-[#393E46] font-bold">Kekurangan BFS:</h1>
          <ul>
            <li className="text-lg">1. BFS memerlukan memori yang besar untuk menyimpan simpul yang telah dijelajahi.</li>
            <li className="text-lg">2. BFS tidak efisien jika graf memiliki kedalaman yang sangat besar.</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default BFS;