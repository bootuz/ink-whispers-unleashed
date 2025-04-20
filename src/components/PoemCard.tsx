
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    <Link to={`/poem/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:bg-muted/20">
        <CardContent className="p-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="font-playfair text-xl mb-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-gray-600 text-sm mb-3">by {author.name}</p>
          
          {displayContent && (
            <div className="prose prose-sm line-clamp-3">
              {firstLine && <p className="font-semibold mb-1">{firstLine}</p>}
              {restOfContent && <p className="text-gray-700">{restOfContent}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
