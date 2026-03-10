"use client";

import { useState, useEffect } from "react";
import { ClientCaseList } from "@/components/expertises/ClientCaseList";
import { ClientCaseDetails } from "@/components/expertises/ClientCaseDetails";
import type { ClientCase } from "@/type";

type Props = {
  cases: ClientCase[];
  children?: React.ReactNode;
};

export function ExpertiseCasesSection({ cases, children }: Props) {
  const [selected, setSelected] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    if (selected === displayedIndex) return;
    const timer = setTimeout(() => setDisplayedIndex(selected), 200);
    return () => clearTimeout(timer);
  }, [selected, displayedIndex]);

  const fading = selected !== displayedIndex;

  const handleSelect = (index: number) => {
    setSelected(index);
    document.getElementById("case-details")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ClientCaseList items={cases} onSelect={handleSelect} />
      {children}
      <ClientCaseDetails
        items={cases}
        displayedIndex={displayedIndex}
        fading={fading}
        onSelect={handleSelect}
      />
    </>
  );
}
