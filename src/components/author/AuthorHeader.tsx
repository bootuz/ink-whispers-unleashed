
import { Calendar, Book, Eye, UserRound } from "lucide-react";

interface AuthorHeaderProps {
  name: string;
  photo: string | null;
  joined: string;
  poemsCount: number;
  viewsCount: number;
}

export function AuthorHeader({ name, photo, joined, poemsCount, viewsCount }: AuthorHeaderProps) {
  const AVATAR_GRADIENT = "bg-gradient-to-br from-purple-200 via-purple-100 to-white border-4 border-white shadow-lg";
  
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div
        className={`relative flex-shrink-0 w-36 h-36 rounded-full overflow-hidden ${AVATAR_GRADIENT} flex items-center justify-center`}
      >
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <UserRound className="w-16 h-16 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-3 items-center md:items-start">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{name}</h1>
        </div>
        <div className="flex gap-5 mt-2 text-gray-700 text-sm flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Joined: {joined}</span>
          </div>
          <div className="flex items-center gap-1">
            <Book className="w-4 h-4" />
            <span>{poemsCount} Poems</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{viewsCount} Views</span>
          </div>
        </div>
      </div>
    </div>
  );
}
