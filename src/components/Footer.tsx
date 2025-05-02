
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur border-t border-purple-100 py-2 flex justify-between items-center px-4 shadow-sm">
      <span className="text-sm text-gray-600">
        Made with <Heart className="inline-block mx-1" color="#7e22ce" size={16} fill="#7e22ce" /> by Адыгэбзэ Хасэ
      </span>
      <a 
        href="https://apps.apple.com/us/app/%D1%83%D1%81%D1%8D%D1%80%D0%B0%D0%B4%D1%8D/id6478048644?itscg=30200&itsct=apps_box_badge" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img 
          src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1708905600" 
          alt="Download on the App Store" 
          className="w-[123px] h-[41px] object-contain"
        />
      </a>
    </footer>
  );
};
