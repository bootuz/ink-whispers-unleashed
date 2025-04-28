
import { FileText, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorInfoCardsProps {
  bio: string | null;
  details: {
    yearsActive: string;
    lastActivity: string;
    placeOfBirth: string;
    languages: string;
  };
}

export function AuthorInfoCards({ bio, details }: AuthorInfoCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white bg-opacity-80 border-0 shadow-none rounded-xl min-h-[180px]">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-purple-800" />
            <h2 className="text-xl font-semibold text-purple-950">Bio</h2>
          </div>
          <p className="text-md text-muted-foreground leading-relaxed">
            {bio || (
              <span className="italic text-gray-400">
                No biography provided yet.
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white bg-opacity-80 border-0 shadow-none rounded-xl min-h-[180px]">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <UserRound className="h-5 w-5 text-purple-800" />
            <h2 className="text-xl font-semibold text-purple-950">
              Author Details
            </h2>
          </div>
          <ul className="text-md text-gray-700 space-y-2">
            <li>
              <span className="font-semibold text-purple-900">Years Active: </span>
              {details.yearsActive}
            </li>
            <li>
              <span className="font-semibold text-purple-900">Last Activity: </span>
              {details.lastActivity}
            </li>
            <li>
              <span className="font-semibold text-purple-900">Place of Birth: </span>
              {details.placeOfBirth}
            </li>
            <li>
              <span className="font-semibold text-purple-900">Languages: </span>
              {details.languages}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
