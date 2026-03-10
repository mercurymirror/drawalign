import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type Props = {
  text: string;
  cta: {
    buttonText: string;
    buttonLink: string;
  } | null;
  className?: string;
};

export function CtaBanner({ text, cta, className }: Props) {
  return (
    <section className={cn("w-full bg-primary text-white", className)}>
      <div className="px-5 py-16 md:py-24 max-w-9xl mx-auto flex flex-col items-center gap-8 text-center">
        <h2 className="text-4xl md:text-6xl tracking-tight">{text}</h2>
        {cta && (
          <Button href={cta.buttonLink} variant="foreground">
            <span className="flex items-center gap-2">
              {cta.buttonText}
              <ArrowIcon />
            </span>
          </Button>
        )}
      </div>
    </section>
  );
}
