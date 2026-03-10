import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string | null;
  title: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, className }: Props) {
  return (
    <div className={cn("text-center px-37 pt-8", className)}>
      {eyebrow && (
        <p className="mb-7 text-base font-medium text-foreground">{eyebrow}</p>
      )}
      <h2 className="text-4xl md:text-6xl tracking-[-7%] max-w-2xl mx-auto">
        {title}
      </h2>
    </div>
  );
}
