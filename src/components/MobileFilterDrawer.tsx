import { Filter, X } from "lucide-react";
import { Button } from "@/components/event-ui/button";
import { Badge } from "@/components/event-ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/event-ui/drawer";
import { categories, dateTags, departments } from "@/components/data/events";

interface MobileFilterDrawerProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Mobile drawer component for event filtering.
 * Provides category, date, and department filters in a mobile-optimized drawer.
 * @component
 */
export function MobileFilterDrawer({
  activeFilter,
  onFilterChange,
  open,
  onOpenChange,
}: MobileFilterDrawerProps) {
  const handleFilterSelect = (filter: string) => {
    onFilterChange(filter);
    onOpenChange(false); // Auto-close on selection
  };

  const isActive = (filter: string) => activeFilter === filter;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden border-border/50 bg-card hover:bg-card/80"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-background border-border/50 max-h-[85vh]">
        <DrawerHeader className="border-b border-border/30">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-foreground">Filters</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`cursor-pointer transition-all ${isActive(category)
                      ? "bg-primary/20 text-primary border-primary/50"
                      : "bg-card text-muted-foreground border-border/50"
                    }`}
                  onClick={() => handleFilterSelect(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date Tags */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-secondary" />
              Date
            </h3>
            <div className="flex flex-wrap gap-2">
              {dateTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`cursor-pointer transition-all ${isActive(tag)
                      ? "bg-secondary/20 text-secondary border-secondary/50"
                      : "bg-card text-muted-foreground border-border/50"
                    }`}
                  onClick={() => handleFilterSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Departments
            </h3>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <Badge
                  key={dept}
                  variant="outline"
                  className={`cursor-pointer transition-all ${isActive(dept)
                      ? "bg-accent/20 text-accent border-accent/50"
                      : "bg-card text-muted-foreground border-border/50"
                    }`}
                  onClick={() => handleFilterSelect(dept)}
                >
                  {dept}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reset */}
          {activeFilter !== "All Events" && (
            <Button
              variant="outline"
              className="w-full border-border/50"
              onClick={() => handleFilterSelect("All Events")}
            >
              <X className="h-4 w-4 mr-2" />
              Reset to All Events
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
