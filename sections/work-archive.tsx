"use client";

import { useMemo, useState } from "react";
import { ArchiveFilter } from "@/components/archive/archive-filter";
import { ArchiveLightbox } from "@/components/archive/archive-lightbox";
import { ArchiveTile } from "@/components/archive/archive-tile";
import { PageContainer } from "@/components/layout/page-container";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import {
  archiveCategories,
  archivePage,
  filterArchiveItems,
  getCategoryById,
  type ArchiveFilterId,
  type ArchiveItem,
} from "@/data/content/archive";

function groupByCategory(items: ArchiveItem[]) {
  return archiveCategories
    .map((category) => ({
      category,
      items: items.filter((item) => item.categoryId === category.id),
    }))
    .filter((group) => group.items.length > 0);
}

export function WorkArchive() {
  const [filter, setFilter] = useState<ArchiveFilterId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => filterArchiveItems(filter), [filter]);

  const groups = useMemo(() => {
    if (filter === "all") return groupByCategory(filteredItems);
    return [
      {
        category: getCategoryById(filter),
        items: filteredItems,
      },
    ];
  }, [filter, filteredItems]);

  const openLightbox = (itemId: string) => {
    const index = filteredItems.findIndex((item) => item.id === itemId);
    if (index >= 0) setLightboxIndex(index);
  };

  return (
    <>
      <PageContainer width="default" className="section-space-hero pb-8">
        <Stagger immediate className="flex max-w-3xl flex-col gap-6">
          <FadeIn staggerItem>
            <Text variant="label">Archive</Text>
          </FadeIn>
          <FadeIn staggerItem>
            <Text as="h1" variant="display-lg" className="text-balance">
              {archivePage.title}
            </Text>
          </FadeIn>
          <FadeIn staggerItem>
            <Text variant="body" className="max-w-xl text-ivory-muted">
              {archivePage.intro}
            </Text>
          </FadeIn>
        </Stagger>
      </PageContainer>

      <div className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-md md:top-[4.75rem]">
        <PageContainer width="wide" className="py-4">
          <ArchiveFilter active={filter} onChange={setFilter} />
        </PageContainer>
      </div>

      <PageContainer width="wide" className="section-space flex flex-col gap-20 md:gap-28">
        {groups.map(({ category, items }) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`archive-${category.id}-title`}
            className="flex flex-col gap-8 md:gap-10"
          >
            <header className="grid gap-4 border-t border-border pt-10 md:grid-cols-12 md:gap-8">
              <Text
                id={`archive-${category.id}-title`}
                variant="label"
                className="text-ivory-subtle md:col-span-2"
              >
                {category.index}
              </Text>
              <Text
                as="h2"
                variant="display-md"
                className="md:col-span-4"
              >
                {category.title}
              </Text>
              <Text variant="body-sm" className="md:col-span-6 md:max-w-md">
                {category.description}
              </Text>
            </header>

            <Stagger stagger={0.08} className="flex flex-col gap-6 md:gap-8">
              {items.map((item) => (
                <FadeIn key={item.id} staggerItem>
                  <ArchiveTile
                    item={item}
                    onOpen={() => openLightbox(item.id)}
                  />
                </FadeIn>
              ))}
            </Stagger>
          </section>
        ))}
      </PageContainer>

      <ArchiveLightbox
        items={filteredItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </>
  );
}
