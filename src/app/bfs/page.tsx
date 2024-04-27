import React from "react";

const BFS: React.FC = () => {
  return (
    <main className="font-mono flex min-h-screen flex-col items-center p-24">
      <div className="w-full m-auto flex flex-row gap-12 px-36 bg-color4 p-24 rounded-3xl shadow-2xl">
        <div className="container w-1/2 mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">
            Breadth First Search (BFS) Algorithm
          </h2>
          <p className="mb-4">
            Algoritma Breadth First Search (BFS) adalah teknik eksplorasi dan
            pencarian yang menggunakan pendekatan &quot;melebar&quot; untuk menjelajahi
            semua simpul pada tingkat tertentu sebelum melanjutkan ke tingkat
            berikutnya. BFS adalah salah satu algoritma dasar dalam ilmu
            komputer dan digunakan secara luas untuk berbagai aplikasi, terutama
            dalam konteks graf dan pohon. BFS memulai eksplorasi dari simpul
            awal (sering disebut sebagai simpul sumber atau root), kemudian
            mengunjungi simpul-simpul tetangga terlebih dahulu sebelum bergerak
            ke simpul pada tingkat berikutnya. Algoritma ini menggunakan antrian
            (queue) untuk menyimpan urutan simpul yang akan dikunjungi
          </p>
          <h3 className="text-xl font-semibold mb-2">Steps of BFS:</h3>
          <ol className="list-decimal pl-8">
            <li>
              <strong>Inisialisasi (Initialization):</strong> Simpul awal dimasukkan ke dalam antrian dan ditandai sebagai sudah dikunjungi.
            </li>
            <li>
              <strong>Proses Antrian (Queue Processing):</strong> Ambil simpul dari awal antrian dan periksa apakah simpul tersebut merupakan solusi.
            </li>
            <li>
              <strong>
                Pemeriksaan Simpul Tetangga (Checking Neighbor Nodes):
              </strong>{" "}
              Jika bukan solusi, tambahkan semua simpul tetangga yang belum dikunjungi ke dalam antrian dan tandai sebagai sudah dikunjungi.
            </li>
            <li>
              <strong>Pengulangan (Iteration):</strong> Lanjutkan proses ini sampai antrian kosong atau solusi ditemukan.
            </li>
          </ol>
        </div>
        <div className="container w-1/2 mx-auto py-8">
            <h2 className="text-3xl font-bold mb-4">Kelebihan dan Kekurangan Breadth First Search (BFS)</h2>
            <h3 className="text-xl font-semibold mb-2">Kelebihan BFS:</h3>
            <ul className="list-disc pl-8 mb-4">
                <li><strong>Tidak Akan Menemui Jalan Buntu:</strong> BFS selalu menjelajahi semua simpul pada tingkat tertentu sebelum bergerak ke tingkat berikutnya, sehingga tidak pernah terjebak pada jalur buntu, kecuali memang tidak ada solusi yang ditemukan.</li>
                <li><strong>Menemukan Solusi Terpendek:</strong> Jika graf tidak berbobot, BFS selalu menemukan jalur terpendek ke tujuan karena mengunjungi simpul berdasarkan urutan tingkat.</li>
                <li><strong>Dapat Menemukan Lebih dari Satu Solusi:</strong> Jika ada beberapa solusi, BFS akan menemukan semua solusi dan memberikan solusi minimum (dengan tingkat terendah).</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Kekurangan BFS:</h3>
            <ul className="list-disc pl-8">
                <li><strong>Membutuhkan Memori Besar:</strong> Karena BFS harus menyimpan semua simpul pada tingkat tertentu, ia bisa memakan banyak memori, terutama jika graf sangat lebar atau memiliki banyak simpul.</li>
                <li><strong>Lemah untuk Pencarian Solusi yang Relatif Ada dalam Kedalaman yang Dalam:</strong> BFS menguji semua simpul pada tingkat tertentu sebelum melanjutkan ke tingkat berikutnya. Jika solusi berada pada tingkat yang lebih dalam, BFS akan menghabiskan waktu yang cukup lama untuk mencapainya.</li>
            </ul>
        </div>
      </div>
    </main>
  );
};

export default BFS;
