import { cn } from "@/lib/utils";

type Props = {
  variant?: "default" | "narrow";
  noPadding?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const layout = {
  default: "px-5 max-w-9xl mx-auto",
  narrow: "px-5 md:px-18 lg:px-38 max-w-9xl mx-auto",
};

const defaultPadding = "py-8 md:py-12";

export function Section({
  variant = "default",
  noPadding = false,
  id,
  className,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cn(layout[variant], !noPadding && defaultPadding, className)}
    >
      {children}
    </section>
  );
}
