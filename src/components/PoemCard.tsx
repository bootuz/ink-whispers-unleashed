
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

export interface PoemCardProps {
  id: number;
  title: string;
  author: { id: number, name: string };
  content?: string;
  excerpt?: string;
}

export const PoemCard = ({ id, title, author, content, excerpt }: PoemCardProps) => {
  // Use content if provided, otherwise use excerpt
  const displayText = content || excerpt || "";
  
  return (
    <Link to={`/poem/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:bg-muted/20">
        <CardContent className="p-6">
          <h3 className="font-playfair text-xl mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">by {author.name}</p>
          <p className="font-playfair text-gray-800 line-clamp-3">{displayText}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
