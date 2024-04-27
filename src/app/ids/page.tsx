import React from "react";

const IDS: React.FC = () => {
  return (
    <main className="font-mono flex min-h-screen flex-col items-center p-24">
      <div className="w-full m-auto flex flex-row gap-12 px-36 bg-color4 p-24 rounded-3xl shadow-2xl">
        <div className="container w-1/2 mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">
            Iterative Deepening Search (IDS) Algorithm
          </h2>
          <p className="mb-4">
            Iterative Deepening Search (IDS) adalah algoritma pencarian yang
            menggabungkan manfaat dari Breadth-First Search (BFS) dan
            Depth-First Search (DFS). IDS digunakan untuk menjelajahi graf atau
            pohon dengan pendekatan &quot;bertahap dalam&quot;, yang secara bertahap
            meningkatkan kedalaman pencarian sampai solusi ditemukan atau semua
            simpul telah dieksplorasi.
          </p>
          <p className="mb-4">
            IDS dimulai dengan kedalaman nol dan meningkatkannya satu tingkat
            setiap iterasi, mirip dengan DFS dalam hal pendekatan kedalaman,
            tetapi dengan keuntungan tambahan seperti BFS. Algoritma ini
            menggunakan teknik rekursi untuk menyelesaikan masalah yang
            kompleks.
          </p>
          <h3 className="text-xl font-semibold mb-2">Langkah-langkah IDS:</h3>
          <ol className="list-decimal pl-8 mb-4">
            <li>
              <strong>Inisialisasi:</strong> Tentukan kedalaman maksimum untuk
              setiap iterasi, biasanya dimulai dari nol.
            </li>
            <li>
              <strong>Pencarian Rekursif:</strong> Mulai dari simpul awal,
              lakukan pencarian DFS sampai batas kedalaman saat ini (tidak ada
              lagi anak yang bisa ditelusuri).
            </li>
            <li>
              <strong>Periksa Solusi:</strong> Jika simpul tersebut adalah
              solusi, hentikan pencarian dan kembalikan hasilnya.
            </li>
            <li>
              <strong>Lanjutkan ke Simpul Tetangga:</strong> Jika bukan solusi,
              lanjutkan ke simpul tetangga, tetapi hanya sampai batas kedalaman
              saat ini.
            </li>
            <li>
              <strong>Iterasi:</strong> Jika semua simpul pada kedalaman saat
              ini telah dijelajahi tanpa menemukan solusi, tingkatkan batas
              kedalaman dan ulangi pencarian.
            </li>
          </ol>
        </div>
        <div className="container w-1/2 mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">
            Kelebihan dan Kekurangan Iterative Deepening Search (IDS)
          </h2>
          <h3 className="text-xl font-semibold mb-2">Kelebihan IDS:</h3>
          <ul className="list-disc pl-8 mb-4">
            <li>
              <strong>Kebutuhan Memori Lebih Rendah:</strong> IDS membutuhkan
              lebih sedikit memori dibandingkan BFS karena hanya menyimpan
              simpul dalam jalur saat ini, bukan semua simpul pada tingkat
              tertentu.
            </li>
            <li>
              <strong>Menemukan Solusi Terpendek (Jika Ada):</strong> Seperti
              BFS, IDS selalu menemukan solusi dengan kedalaman terendah karena
              pencarian dilakukan bertahap.
            </li>
            <li>
              <strong>Efisiensi dalam Pencarian di Graf Luas dan Dalam:</strong>{" "}
              IDS lebih cocok untuk graf yang sangat dalam karena tidak perlu
              menyimpan semua simpul di setiap tingkat.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Kekurangan IDS:</h3>
          <ul className="list-disc pl-8 mb-4">
            <li>
              <strong>Pengulangan Pencarian:</strong> Karena IDS memulai ulang
              pencarian dari awal setiap kali kedalaman ditingkatkan, ada banyak
              pengulangan dalam eksplorasi simpul yang sama.
            </li>
            <li>
              <strong>Kurang Efisien untuk Graf Dangkal:</strong> Untuk graf
              yang relatif dangkal, IDS bisa menjadi kurang efisien karena
              pengulangan pencarian.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default IDS;
