
import { Button } from "@/components/ui/button"
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
  onMoreClick?: () => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

export const PoemGrid = ({ 
  title, 
  poems, 
  onMoreClick,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPagination = false
}: PoemGridProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const displayedPoems = showPagination ? poems : poems.slice(0, 6);

  return (
    <section className="w-full">
      <h2 className="text-2xl font-playfair mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedPoems.map((poem) => (
          <PoemCard key={poem.id} {...poem} />
        ))}
      </div>
      {showPagination && onPageChange ? (
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
      ) : onMoreClick && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={onMoreClick}
            className="w-[200px]"
          >
            More
          </Button>
        </div>
      )}
    </section>
  )
}
