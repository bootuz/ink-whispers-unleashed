
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface PoemCardProps {
  id: number;
  title: string;
  author: { id: number, name: string };
  content?: string;
  excerpt?: string;
}

export const PoemCard = ({ id, title, author, content, excerpt }: PoemCardProps) => {
  const lines = content.split('\n');
  const firstLine = lines[0];
  const remainingText = lines.length > 1 ? lines.slice(1).join('\n') : "";
  
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
          
          {firstLine && (
            <p className="font-playfair text-gray-800 font-medium mb-1">{firstLine}</p>
          )}
          
          {remainingText && (
            <p className="font-playfair text-gray-800 line-clamp-2">{remainingText}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
