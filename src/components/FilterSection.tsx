import { X } from "lucide-react";
import { Button } from "@/components/event-ui/button";
import { categories, dateTags, departments } from "@/components/data/events";

interface FilterSectionProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

/**
 * Filter sidebar component for event categorization.
 * Supports filtering by categories, date tags, and departments.
 * @component
 */
export function FilterSection({
  activeFilter,
  onFilterChange,
}: FilterSectionProps) {
  const isActive = (filter: string) => activeFilter === filter;

  // Reusable group renderer for filter sections
  const FilterGroup = ({ title, color, items }: { title: string; color: string; items: string[] }) => (
    <div className="mb- last:mb-0">
      <h2 className={`text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2`}>
        <span className={`h-1.5 w-1.5 rounded-sm ${color} shadow-[0_0_8px_${color}]`} />
        {title}
      </h2>
      <div className="gap-2">
        {items.map((item) => (
          <div
            key={item}
            onClick={() => onFilterChange(item)}
            className={`
              relative cursor-pointer px-3 py-1.5 text-l font-medium transition-all duration-300 clip-path-slant border-l-2
              ${isActive(item)
                ? "bg-white/10 text-white border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                : "bg-black/40 text-white border-transparent hover:text-white hover:bg-white/5 hover:border-white/20"
              }
            `}
          >
            {item}
            {isActive(item) && (
              <span className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      <FilterGroup title="Categories" color="bg-primary" items={categories} />
     


      {/* Reset Filter */}
      {activeFilter !== "All Events" && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange("All Events")}
          className="w-full mt-6 border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/50 transition-all uppercase tracking-wider text-xs font-bold h-10"
        >
          <X className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      )}
    </div>
  );
}

