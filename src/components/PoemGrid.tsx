
import { Button } from "@/components/ui/button"
import { PoemCard } from "./PoemCard"
import { ChevronRight } from "lucide-react"

interface Poem {
  id: number;
  title: string;
  author: { id: number; name: string };
  excerpt?: string;
}

interface PoemGridProps {
  title: string;
  poems: Poem[];
  onMoreClick?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export const PoemGrid = ({ 
  title, 
  poems,
  onMoreClick,
  hasMore = false,
  loading = false
}: PoemGridProps) => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-playfair mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {poems.map((poem) => (
          <PoemCard key={poem.id} {...poem} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button 
            variant="default" 
            onClick={onMoreClick}
            disabled={loading}
            className="w-[250px] bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-300 group"
          >
            {loading ? 'Loading...' : 'More Poems'}
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}
    </section>
  )
}

