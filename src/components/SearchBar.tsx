import { Search } from "lucide-react";
import { Input } from "@/components/event-ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Search input component for filtering events by name or description.
 * @component
 */
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <Input
        type="text"
        placeholder="Search events..."
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 h-12 bg-card border-border/50 focus:border-primary focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
        aria-label="Search events"
      />
    </div>
  );
}
