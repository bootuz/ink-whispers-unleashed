
import { SearchBar } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"

interface HeroSectionProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

export const HeroSection = ({ searchQuery, onSearch, onKeyPress }: HeroSectionProps) => {
  return (
    <div className="flex flex-col items-center text-center p-8 mb-8">
      <h1 
        className="text-5xl md:text-6xl mb-4 tracking-wider text-purple-900"
        style={{
          fontFamily: "'Marck Script', cursive",
          fontWeight: 400,
          fontStyle: "normal"
        }}
      >
        Усэрадэ
      </h1>
      <p className="text-gray-600 max-w-2xl mb-8 text-lg">
        Explore the beauty of Circassian poetry, discover new authors, and immerse yourself in the rich literary heritage of the Adyghe people.
      </p>
      <SearchBar 
        className="w-full max-w-2xl" 
        value={searchQuery}
        onSearch={onSearch}
        onKeyDown={onKeyPress}
      />
    </div>
  )
}
