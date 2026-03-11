import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { DiagramCard } from "@/type";

type Props = {
	center_title: string | null;
	center_text: string | null;
	left: DiagramCard | null;
	right: DiagramCard | null;
};

const cardBg = {
	primary: "bg-primary",
	secondary: "bg-secondary",
};

function Card({ card }: { card: DiagramCard }) {
	return (
		<div
			className={cn(
				"xl-p-8 flex max-w-77.5 flex-col gap-4 rounded-2xl p-5 text-white",
				cardBg[card.background],
			)}
		>
			<p className="font-semibold text-lg">{card.title}</p>
			{card.subtitle && <p className="text-sm tracking-tight xl:text-lg">{card.subtitle}</p>}
			{card.subtitle && <hr className="border-white/40" />}
			{card.text && <p className="whitespace-pre-line text-[10px] leading-normal">{card.text}</p>}
		</div>
	);
}

export function MethodeDiagram({ center_title, center_text, left, right }: Props) {
	if (!left && !right && !center_title) return null;

	return (
		<Section variant="px80" className="py-12 md:py-20">
			<div className="relative grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
				<div className="absolute inset-0 inset-x-0 z-0 m-auto hidden h-px w-80 -translate-y-1/2 bg-primary md:block lg:w-113.5" />
				{/* Left card */}
				<div className="relative z-10 flex justify-end">{left && <Card card={left} />}</div>

				{/* Center diagram */}
				<div className="relative mx-auto flex aspect-square items-center justify-center lg:w-107.5">
					{/* Outer ring */}
					<Image
						src="/methode/circle.svg"
						alt=""
						fill
						className="absolute inset-0"
						aria-hidden="true"
					/>
					{/* Inner ring */}
					<div className="absolute" style={{ width: "70%", height: "70%" }}>
						<Image src="/methode/circle2.svg" alt="" fill aria-hidden="true" />
					</div>
					{/* Small circle top-right */}
					<Image
						src="/methode/circle-inside1.svg"
						alt=""
						width={56}
						height={56}
						className="absolute"
						style={{ top: "12%", right: "6%" }}
						aria-hidden="true"
					/>
					{/* Small circle bottom-left */}
					<Image
						src="/methode/circle-inside2.svg"
						alt=""
						width={38}
						height={38}
						className="absolute"
						style={{ bottom: "16%", left: "5%" }}
						aria-hidden="true"
					/>
					{/* Center dark circle */}
					<div className="relative z-10 flex aspect-square w-[48%] flex-col items-center justify-center gap-1 rounded-full bg-foreground px-4 text-center">
						{center_title && (
							<p className="font-medium text-sm text-white leading-tight md:text-xl">
								{center_title}
							</p>
						)}
						{center_text && (
							<p className="px-6 text-[10px] text-white leading-normal">{center_text}</p>
						)}
					</div>
				</div>

				{/* Right card */}
				<div className="relative z-10">{right && <Card card={right} />}</div>
			</div>
		</Section>
	);
}
