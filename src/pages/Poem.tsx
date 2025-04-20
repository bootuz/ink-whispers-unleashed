
import { useParams } from 'react-router-dom';
import { usePoem } from '@/hooks/useApi';

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
        <h1 className="font-playfair text-4xl mb-4">{poem.title}</h1>
        <p className="text-gray-600 text-xl mb-8">by {poem.author.name}</p>
        <div className="font-playfair whitespace-pre-line leading-relaxed">
          {poem.content}
        </div>
      </article>
    </div>
  );
};

export default Poem;
