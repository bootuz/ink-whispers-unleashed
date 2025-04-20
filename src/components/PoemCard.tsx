
interface PoemCardProps {
  title: string;
  author: string;
  excerpt: string;
}

export const PoemCard = ({ title, author, excerpt }: PoemCardProps) => {
  return (
    <div className="p-6 border border-gray-100 hover:border-gray-300 transition-colors rounded-lg cursor-pointer">
      <h3 className="font-playfair text-xl mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">by {author}</p>
      <p className="font-playfair text-gray-800 line-clamp-3">{excerpt}</p>
    </div>
  )
}
