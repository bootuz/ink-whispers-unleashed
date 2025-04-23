
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white/60 backdrop-blur border-t py-2 text-right px-4">
      <span className="text-sm text-gray-600">
        Made with <Heart className="inline-block mx-1" color="#ea384c" size={16} fill="#ea384c" /> by Адыгэбзэ Хасэ
      </span>
    </footer>
  );
};
