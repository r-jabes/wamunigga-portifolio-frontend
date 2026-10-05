"use client";

import type { ArchiveFilterId } from "@/data/content/archive";
import { archiveFilters } from "@/data/content/archive";
import { focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

type ArchiveFilterProps = {
  active: ArchiveFilterId;
  onChange: (filter: ArchiveFilterId) => void;
};

export function ArchiveFilter({ active, onChange }: ArchiveFilterProps) {
  return (
    <nav aria-label="Archive categories" className="w-full">
      <ul className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {archiveFilters.map((filter) => {
          const isActive = filter.id === active;
          return (
            <li key={filter.id} className="shrink-0">
              <button
                type="button"
                data-cursor="interactive"
                aria-pressed={isActive}
                onClick={() => onChange(filter.id)}
                className={cn(
                  "type-label border px-4 py-2.5 transition-colors duration-200",
                  focusRingClass,
                  isActive
                    ? "border-ivory bg-ivory text-background"
                    : "border-border text-ivory-subtle hover:border-border-strong hover:text-ivory",
                )}
              >
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
