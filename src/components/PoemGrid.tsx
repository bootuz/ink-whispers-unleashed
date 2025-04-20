
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
}

export const PoemGrid = ({ title, poems }: PoemGridProps) => {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-playfair mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.map((poem) => (
          <PoemCard key={poem.id} {...poem} />
        ))}
      </div>
    </section>
  )
}
