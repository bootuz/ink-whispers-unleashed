
import { Eye, Heart } from "lucide-react";

interface PoemMetricsProps {
  views?: number;
  likes?: number;
}

export const PoemMetrics = ({ views, likes }: PoemMetricsProps) => (
  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
    <span className="flex items-center gap-1">
      <Eye className="w-4 h-4" /> {typeof views === "number" ? views : 0}
    </span>
    <span className="flex items-center gap-1">
      <Heart className="w-4 h-4" /> {typeof likes === "number" ? likes : Math.floor(views ? views * 0.15 : Math.random() * 30)}
    </span>
  </div>
);
