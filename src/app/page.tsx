// src/app/page.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4">
      <h1 className="text-6xl font-bold text-center text-pink-600 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Buse & Aydoğan
      </h1>
      <h2 className="text-4xl text-center text-gray-800 mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>
        29.04.24
      </h2>
      <div className="flex flex-col items-center">
        <button className="btn btn-primary mb-4 px-4 py-2 rounded-lg shadow-lg">Fotoğraf ve Video Yükle</button>
        <button className="btn btn-secondary px-4 py-2 rounded-lg shadow-lg">Galeri</button>
      </div>
    </div>
  );
};

export default Home;
