
import { useParams, Link } from 'react-router-dom';
import { usePoem } from '@/hooks/useApi';
import { PoemMetrics } from '@/components/PoemMetrics';
import { ShareButton } from '@/components/ShareButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Poem = () => {
  const { id } = useParams<{ id: string }>();
  const { data: poem, isLoading } = usePoem(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
        Loading...
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
        Poem not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      <article className="prose prose-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to={`/author/${poem.author.id}`} className="text-gray-600 hover:text-gray-800 no-underline">
            by {poem.author.name}
          </Link>
          <ShareButton title={poem.title} />
        </div>

        <h1 className="font-playfair text-4xl mb-4">{poem.title}</h1>

        <div className="flex items-center gap-4 mb-6">
          <PoemMetrics views={poem.views} likes={poem.likes} />
          {poem.theme && (
            <Badge variant="secondary" className="text-sm">
              {poem.theme.title}
            </Badge>
          )}
        </div>

        <div className="font-playfair whitespace-pre-line leading-relaxed mb-8">
          {poem.content}
        </div>

        <div className="flex justify-between items-center mt-8 border-t pt-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.history.forward()}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </article>
    </div>
  );
};

export default Poem;
