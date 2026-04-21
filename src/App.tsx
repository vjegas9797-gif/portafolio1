/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [notionData, setNotionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notion-data')
      .then(res => res.json())
      .then(res => {
         if (res.status === 'success') {
           setNotionData(res.data);
         }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-white rounded-full animate-spin mb-4" />
          <h2 className="text-xl tracking-widest uppercase font-light">Cargando Datos de Notion...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero data={notionData?.inicio} />
        <About data={notionData?.sobre_mi} />
        <Portfolio data={notionData?.proyectos} />
        <Contact data={notionData?.contacto} />
      </main>
      <Footer />
    </div>
  );
}

