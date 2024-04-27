import React from "react";

const FrontEndDevelopment = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">
        Bagian 1: Front-end Development
      </h2>
      <p className="mb-2">
        Deskripsi: Berfokus pada elemen yang dilihat dan berinteraksi dengan
        pengguna akhir.
      </p>
      <p className="mb-2">Tugas Utama:</p>
      <ul className="list-disc pl-8 mb-4">
        <li>Membuat UI (User Interface) yang menarik dan mudah dinavigasi.</li>
        <li>
          Mengoptimalkan UX (User Experience) untuk interaksi yang intuitif.
        </li>
        <li>Menghubungkan antarmuka dengan data back-end.</li>
        <li>Memastikan responsivitas di berbagai perangkat.</li>
      </ul>
      <p className="mb-2">Teknologi Utama:</p>
      <ul className="list-disc pl-8">
        <li>HTML (HyperText Markup Language)</li>
        <li>CSS (Cascading Style Sheets)</li>
        <li>JavaScript</li>
        <li>
          Framework dan Library Front-end (React, Angular, Vue.js, jQuery)
        </li>
        <li>Alat Pengembangan dan Build (Webpack, Gulp, npm, Git)</li>
      </ul>
    </div>
  );
};

const BackEndDevelopment = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">
        Bagian 2: Back-end Development
      </h2>
      <p className="mb-2">
        Deskripsi: Berfokus pada apa yang terjadi di sisi server.
      </p>
      <p className="mb-2">Tugas Utama:</p>
      <ul className="list-disc pl-8 mb-4">
        <li>Merancang dan mengelola database.</li>
        <li>Mengembangkan logika bisnis.</li>
        <li>Mengimplementasikan API.</li>
        <li>Mengelola keamanan.</li>
        <li>Mengoptimalkan kinerja.</li>
      </ul>
      <p className="mb-2">Teknologi Utama:</p>
      <ul className="list-disc pl-8">
        <li>
          Bahasa Pemrograman Server-Side (Java, Python, Ruby, PHP, Node.js)
        </li>
        <li>
          Framework dan Platform Server-Side (Django, Ruby on Rails, Spring
          Boot, Express)
        </li>
        <li>Database (MySQL, PostgreSQL, MongoDB, Redis)</li>
        <li>API dan Integrasi (REST, GraphQL, gRPC)</li>
        <li>Alat Pengembangan dan Deployment (Docker, Kubernetes, Git)</li>
      </ul>
    </div>
  );
};

const Dockerization = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Bagian 3: Dockerization</h2>
      <p className="mb-2">
        Deskripsi: Proses mengemas aplikasi dan dependensinya ke dalam
        container.
      </p>
      <p className="mb-2">Manfaat:</p>
      <ul className="list-disc pl-8">
        <li>
          Portabilitas: Aplikasi dapat dijalankan di mana saja tanpa masalah
          kompatibilitas.
        </li>
        <li>
          Konsistensi: Aplikasi berjalan dengan cara yang sama di semua
          lingkungan.
        </li>
        <li>
          Skalabilitas: Container dapat dengan mudah di-scale up atau down untuk
          memenuhi kebutuhan.
        </li>
      </ul>
    </div>
  );
};

const TechnologiesUsed = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
      <ul className="list-disc pl-8">
        <li>Golang - version 1.22.2</li>
        <li>Colly - version 1.2.0</li>
        <li>NextJs - version 14.1.4</li>
        <li>D3.js - version 7.9.0</li>
        <li>ZodValidator - version 3.23.0</li>
        <li>ParticleJS - version 2.0.0</li>
        <li>TailwindCSS</li>
        <li>ShadCN UI Library</li>
      </ul>
    </div>
  );
};

const Docs: React.FC = () => {
  return (
    <main className="font-mono flex min-h-screen flex-col items-center p-24">
      <div className="w-full m-auto flex flex-row gap-12 px-24 bg-color4 p-24 rounded-3xl shadow-2xl">
        <div className="mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            Ringkasan Pengembangan Aplikasi Website
          </h1>
          <div className="flex flex-row gap-10">
            <div className="w-1/2"><FrontEndDevelopment /></div>
            <div className="w-1/2"><BackEndDevelopment /></div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="w-1/2"><Dockerization /></div>
            <div className="w-1/2"><TechnologiesUsed /></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Docs;
