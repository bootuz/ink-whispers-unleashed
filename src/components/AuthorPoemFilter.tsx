
import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export interface FilterValues {
  sort: "title" | "date" | "views";
  theme: string | "all";
  search: string;
}

interface AuthorPoemFilterProps {
  availableThemes: { id: number; title: string }[];
  onFilterChange: (filter: FilterValues) => void;
}

export const AuthorPoemFilter = ({
  availableThemes,
  onFilterChange,
}: AuthorPoemFilterProps) => {
  const [sort, setSort] = useState<FilterValues["sort"]>("date");
  const [theme, setTheme] = useState<FilterValues["theme"]>("all");
  const [search, setSearch] = useState("");

  // Whenever a value changes, propagate new filter state up
  const triggerChange = (next?: Partial<FilterValues>) => {
    onFilterChange({
      sort,
      theme,
      search,
      ...next,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-6">
      <div className="flex gap-3 flex-wrap">
        <Select value={sort} onValueChange={(v) => { setSort(v as FilterValues["sort"]); triggerChange({ sort: v as FilterValues["sort"] }); }}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Newest</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={theme} onValueChange={(v) => { setTheme(v); triggerChange({ theme: v }); }}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {availableThemes.map((t) => (
              <SelectItem key={t.id} value={t.title}>
                {t.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <input
        className="w-full md:w-[220px] border rounded-md py-2 px-3 text-sm bg-white border-gray-200"
        placeholder="Search within poems"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          triggerChange({ search: e.target.value });
        }}
      />
    </div>
  );
};
