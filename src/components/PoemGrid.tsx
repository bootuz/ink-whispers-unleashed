
import { Button } from "@/components/ui/button"
import { PoemCard } from "./PoemCard"

interface Poem {
  id: number;
  title: string;
  author: string;
  excerpt: string;
}

interface PoemGridProps {
  title: string;
  poems: Poem[];
  onMoreClick: () => void;
}

export const PoemGrid = ({ title, poems, onMoreClick }: PoemGridProps) => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-playfair mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {poems.slice(0, 6).map((poem) => (
          <PoemCard key={poem.id} {...poem} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={onMoreClick}
          className="w-[200px]"
        >
          More
        </Button>
      </div>
    </section>
  )
}
