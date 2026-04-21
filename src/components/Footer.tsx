import { Facebook, Twitter, Instagram, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex space-x-8 mb-12">
          <a href="#" className="hover:text-gray-400 transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <Globe size={20} />
          </a>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">
            Copyright © 2024 Julian Portfolio, Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Creado por cosmos-themes.
          </p>
        </div>
      </div>
    </footer>
  );
}
