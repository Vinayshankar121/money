import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/event-ui/select";
import { dateTags } from "@/components/data/events";

interface DateSelectProps {
    value: string;
    onChange: (value: string) => void;
}

/**
 * Date filter dropdown component for event filtering.
 * Allows users to filter events by date tags.
 * @component
 */
export function DateSelect({ value, onChange }: DateSelectProps) {
    // Determine if the current value is one of the date tags, otherwise standard placeholder logic or "All Dates"
    const isDateSelected = dateTags.includes(value as any);

    return (
        <Select
            value={isDateSelected ? value : undefined}
            onValueChange={onChange}
        >
            <SelectTrigger className="w-[180px] bg-card border-border/50 text-foreground">
                <SelectValue placeholder="Filter Date" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
                {/* Option to clear date filter (which effectively shows All Events or creates a way to reset) 
            However, existing logic uses "All Events" to reset. 
            Let's add an explicit "All Dates" option that maps to "All Events" for now 
            OR matches the behavior of "Reset Filters".
        */}
                <SelectItem value="All Events" className="text-foreground hover:bg-muted">
                    All Dates
                </SelectItem>
                {dateTags.map((tag) => (
                    <SelectItem
                        key={tag}
                        value={tag}
                        className="text-foreground hover:bg-muted"
                    >
                        {tag}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
