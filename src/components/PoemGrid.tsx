
import { PoemCard } from "./PoemCard"
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

interface Poem {
  id: number;
  title: string;
  author: string;
  excerpt: string;
}

interface PoemGridProps {
  title: string;
  poems: Poem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PoemGrid = ({ title, poems, currentPage, totalPages, onPageChange }: PoemGridProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="w-full">
      <h2 className="text-2xl font-playfair mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {poems.map((poem) => (
          <PoemCard key={poem.id} {...poem} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}

