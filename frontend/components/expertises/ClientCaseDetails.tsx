import { Section } from "@/components/ui/Section";
import { BoldPrefixText } from "@/components/ui/BoldPrefixText";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClientCase } from "@/type";

type Props = {
  items: ClientCase[];
  displayedIndex: number;
  fading: boolean;
  onSelect: (index: number) => void;
};

const badgeBg = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  accent: "bg-accent text-foreground",
};

function NumberedSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="shrink-0 w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center text-xs font-bold">
          {number}
        </div>
        <h4 className="text-xl md:text-2xl font-medium tracking-tight">
          {title}
        </h4>
      </div>
      {children && <div className="ml-10 flex flex-col gap-6">{children}</div>}
    </div>
  );
}

const highlightBg = {
  primary: "bg-primary",
  secondary: "bg-secondary",
};

function HighlightBox({
  label,
  text,
  variant = "secondary",
  className,
}: {
  label: string;
  text: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl ml-27 p-5 flex flex-col gap-2",
        highlightBg[variant],
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase text-white">{label}</p>
      <p className="text-base text-white leading-normal whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}

function BoldPrefixList({
  items,
  bullet = true,
  prefixClassName,
  itemClassName = "text-muted-foreground",
}: {
  items: { id: number; text: string }[];
  bullet?: boolean;
  prefixClassName?: string;
  itemClassName?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-2",
        bullet && "list-disc pl-5 marker:text-primary",
      )}
    >
      {items.map((item) => (
        <li key={item.id} className="text-sm">
          <BoldPrefixText
            text={item.text}
            prefixClassName={prefixClassName}
            bodyClassName={itemClassName}
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientCaseDetails({
  items,
  displayedIndex,
  fading,
  onSelect,
}: Props) {
  const item = items[displayedIndex];

  return (
    <Section id="case-details" className="flex lg:px-37 flex-col gap-10">
      <div
        className={cn(
          "flex flex-col gap-10 p-8 lg:p-15 bg-accent-peach rounded-2xl transition-opacity duration-200",
          fading ? "opacity-0" : "opacity-100",
        )}
      >
        {/* Header : chip + titre, fond blanc */}
        <div className="flex flex-col gap-4">
          {item.category && (
            <span
              className={cn(
                "self-start rounded-lg px-5 py-2 text-sm font-medium",
                badgeBg[item.background],
              )}
            >
              {item.category.label}
            </span>
          )}
          <h3 className="text-2xl lg:text-[32px] tracking-tighter leading-tight">
            {item.title}
          </h3>
        </div>

        {/* 1. Le contexte */}
        <NumberedSection number={1} title="Le contexte">
          {item.context_text && (
            <p className="text-sm text-muted-foreground leading-normal whitespace-pre-line">
              {item.context_text}
            </p>
          )}
          {item.context_items && item.context_items.length > 0 && (
            <BoldPrefixList
              items={item.context_items}
              prefixClassName="font-normal"
            />
          )}
        </NumberedSection>

        {/* 2. Le problème */}
        <NumberedSection
          number={2}
          title="Le problème : la dilution de l'identité"
        >
          {item.problem_text && (
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {item.problem_text}
            </p>
          )}
          {item.problem_consequence && (
            <HighlightBox
              label="Conséquence"
              variant="secondary"
              text={item.problem_consequence}
            />
          )}
        </NumberedSection>

        {/* 3. La solution */}
        <NumberedSection number={3} title="La solution DRAW ALIGN">
          {item.solution_cycle_name && (
            <p className="text-lg font-medium text-foreground">
              {item.solution_cycle_name}
            </p>
          )}
          {item.solution_steps && item.solution_steps.length > 0 && (
            <div className="flex flex-col gap-5">
              {item.solution_steps.map((step) => (
                <div key={step.id} className="flex gap-3">
                  <span
                    className={cn(
                      "shrink-0 self-start rounded-sm px-4 py-2 text-xs font-bold",
                      badgeBg[step.badge_variant ?? "primary"],
                    )}
                  >
                    {step.badge_label}
                  </span>
                  <div className="flex flex-col gap-2">
                    {step.title && (
                      <span className="text-sm font-medium">{step.title}</span>
                    )}
                    {step.items && step.items.length > 0 && (
                      <BoldPrefixList
                        items={step.items}
                        bullet={false}
                        prefixClassName="text-primary font-semibold"
                      />
                    )}
                    {step.revelation && (
                      <HighlightBox
                        label="Révélation"
                        text={step.revelation}
                        variant="secondary"
                        className="ml-0"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </NumberedSection>

        {/* 4. Les résultats */}
        <NumberedSection
          number={4}
          title="Les résultats mesurés (ROI Culturel)"
        >
          {item.results_metrics && item.results_metrics.length > 0 && (
            <ul className="flex flex-col gap-3">
              {item.results_metrics.map((m) => (
                <li key={m.id} className="flex gap-1">
                  <span className="text-base text-foreground">{m.label}</span>
                  <span className="flex items-center gap-1 text-base">
                    {m.before && (
                      <span className="text-muted-foreground">{m.before}</span>
                    )}
                    {m.before && (
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                    )}
                    <span className="text-primary">{m.after}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {item.results_benefit && (
            <div className="flex flex-col gap-4">
              <p className="text-lg font-semibold">Bénéfice concret :</p>
              <p className="text-base text-muted-foreground leading-normal whitespace-pre-line">
                {item.results_benefit}
              </p>
            </div>
          )}
          {item.results_feedback && (
            <HighlightBox
              label="Feedback client"
              text={item.results_feedback}
              variant="primary"
            />
          )}
        </NumberedSection>
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="flex flex-col gap-6">
          <h4 className="text-2xl tracking-tight">
            Découvrir d&apos;autres cas clients
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items
              .filter((_, i) => i !== displayedIndex)
              .map((other) => {
                const originalIndex = items.indexOf(other);
                return (
                  <button
                    key={other.id}
                    onClick={() => onSelect(originalIndex)}
                    className="flex flex-col gap-3 rounded-2xl border border-light-gray p-6 text-left hover:border-primary transition-colors duration-300"
                  >
                    {other.category && (
                      <span
                        className={cn(
                          "self-start rounded-lg px-4 py-2 text-xs font-medium",
                          badgeBg[other.background],
                        )}
                      >
                        {other.category.label}
                      </span>
                    )}
                    <p className="text-base font-medium leading-tight">
                      {other.thumbnail_title ?? other.title}
                    </p>
                    {other.thumbnail_text && (
                      <p className="text-sm text-muted-foreground leading-normal">
                        {other.thumbnail_text}
                      </p>
                    )}
                    <span className="flex items-center gap-1 text-sm text-primary font-medium mt-auto">
                      Découvrir ce cas <ArrowRight size={14} />
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </Section>
  );
}
