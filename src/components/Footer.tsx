
import { Heart, Apple } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white/60 backdrop-blur border-t py-2 flex justify-between items-center px-4">
      <a 
        href="https://apps.apple.com/ru/app/%D1%83%D1%81%D1%8D%D1%80%D0%B0%D1%8D/id6478048644" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-sm text-gray-600 flex items-center hover:text-gray-800 transition-colors"
      >
        <Apple className="inline-block mr-2" size={16} />
        Download on App Store
      </a>
      <span className="text-sm text-gray-600">
        Made with <Heart className="inline-block mx-1" color="#ea384c" size={16} fill="#ea384c" /> by Адыгэбзэ Хасэ
      </span>
    </footer>
  );
};
