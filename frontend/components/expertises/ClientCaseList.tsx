"use client";

import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BoldPrefixText } from "@/components/ui/BoldPrefixText";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { ClientCase } from "@/type";

type Props = {
  items: ClientCase[];
  onSelect?: (index: number) => void;
};

const bgMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
};

export function ClientCaseList({ items, onSelect }: Props) {
  return (
    <Section noPadding className="bg-accent-peach pt-0 md:pt-0 pb-0 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item, index) => (
          <Fragment key={item.id}>
            {/* Colored card */}
            <div
              className={cn(
                "flex flex-col gap-8 rounded-2xl p-8 lg:p-16",
                bgMap[item.background],
              )}
            >
              <h3 className="text-3xl lg:text-[40px] text-white tracking-tighter">
                {item.card_title ?? item.title}
              </h3>
              {item.features && item.features.length > 0 && (
                <ul className="flex flex-col gap-4">
                  {item.features.map((f) => (
                    <li
                      key={f.id}
                      className="border-l border-white pl-4 text-sm text-white"
                    >
                      <BoldPrefixText text={f.text} />
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto">
                <Button onClick={() => onSelect?.(index)} variant="foreground">
                  <span className="flex items-center gap-2">
                    Voir le cas client
                    <ArrowIcon />
                  </span>
                </Button>
              </div>
            </div>

            {/* White card */}
            <div className="flex flex-col gap-8 rounded-2xl p-8 lg:p-12 bg-white">
              {item.objectives && item.objectives.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-2xl">Objectifs</h4>
                  <ul className="flex flex-col gap-1 list-disc pl-5">
                    {item.objectives.map((o) => (
                      <li key={o.id} className="text-sm">
                        {o.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-2xl">Enjeux</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span
                        key={t.id}
                        className="px-4 py-2 rounded-lg bg-foreground text-background text-base font-bold"
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </Section>
  );
}
