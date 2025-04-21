
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Feather, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export interface PoemCardProps {
  id: number;
  title: string;
  author: { id: number, name: string };
  excerpt?: string;
}

export const PoemCard = ({ id, title, author, excerpt }: PoemCardProps) => {
  // Process excerpt if available
  const displayContent = excerpt || "";
  const lines = displayContent.split('\n');
  const firstLine = lines[0] || "";
  const restOfContent = lines.slice(1).join('\n');

  return (
    <Link
      to={`/poem/${id}`}
      aria-label={`Read more about poem: ${title} by ${author.name}`}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-vivid-purple"
    >
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow hover:bg-soft-purple border-neutral-gray group"
        aria-labelledby={`poem-card-title-${id}`}
        aria-describedby={`poem-card-desc-${id}`}
        tabIndex={0}
      >
        <CardContent className="p-6">
          {/* Title with tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <h3
                id={`poem-card-title-${id}`}
                className="font-playfair text-xl mb-2 truncate whitespace-nowrap overflow-hidden text-ellipsis text-dark-charcoal group-hover:text-vivid-purple transition-colors"
              >
                {title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>

          {/* Author + icon changed to Feather (pen) */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="rounded-full bg-soft-purple flex items-center justify-center w-7 h-7"
              aria-label={`Author icon for ${author.name}`}
              role="img"
            >
              <Feather className="text-vivid-purple" aria-hidden="true" />
            </span>
            <p className="text-gray-800 text-sm font-medium" id={`poem-card-desc-${id}`}>
              {author.name}
            </p>
          </div>

          {/* Excerpt */}
          {displayContent && (
            <div className="prose prose-sm line-clamp-3 text-medium-gray mb-4">
              {firstLine && <p className="font-semibold mb-1 text-dark-charcoal">{firstLine}</p>}
              {restOfContent && <p className="text-gray-700">{restOfContent}</p>}
            </div>
          )}

          {/* "Read more" button with color matching "More Poems" button */}
          <div className="flex items-center mt-4" aria-hidden="true">
            <Button
              variant="default"
              size="sm"
              className="w-[150px] bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-300 group inline-flex items-center font-semibold px-3"
            >
              <BookOpen className="mr-1 w-5 h-5" aria-hidden="true" />
              Read more
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
