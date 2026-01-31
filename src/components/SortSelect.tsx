import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/event-ui/select";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

interface SortOption {
  label: string;
  value: 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';
}

const sortOptions: SortOption[] = [
  { label: "Date (Newest)", value: "date-desc" },
  { label: "Date (Oldest)", value: "date-asc" },
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
];

/**
 * Sort dropdown component for event ordering.
 * Supports sorting by date and name in ascending/descending order.
 * @component
 */
export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value || "date-desc"} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-card border-border/50 text-foreground">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {sortOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-foreground hover:bg-muted"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
