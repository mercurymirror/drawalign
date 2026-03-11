"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { TestimonialsSection } from "@/type";

gsap.registerPlugin(ScrollTrigger);

export function HomeTestimonials({ title, eyebrow, items }: TestimonialsSection) {
	const triggerRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const [centered, setCentered] = useState(false);

	useEffect(() => {
		const mm = gsap.matchMedia();

		mm.add("(min-width: 768px)", () => {
			const trigger = triggerRef.current;
			const track = trackRef.current;
			if (!trigger || !track) return;

			if (track.scrollWidth <= window.innerWidth) {
				setCentered(true);
				return;
			}

			const RIGHT_PAD = 64;
			const totalScroll = track.scrollWidth - window.innerWidth + RIGHT_PAD;

			gsap.to(track, {
				x: -totalScroll,
				ease: "none",
				scrollTrigger: {
					trigger,
					pin: true,
					scrub: 1,
					start: "top 10%",
					end: `+=${totalScroll}`,
				},
			});
		});

		return () => mm.revert();
	}, []);

	return (
		<section ref={triggerRef} className="py-16 md:overflow-hidden">
			{(title || eyebrow) && (
				<div className="mx-auto mb-12 max-w-9xl px-5">
					<SectionHeader title={title ?? ""} eyebrow={eyebrow} />
				</div>
			)}
			<div className="relative">
				<div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 md:hidden" />
				<div
					ref={trackRef}
					className={cn(
						"scrollbar-hide flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 md:snap-none md:overflow-visible md:px-16",
						centered && "md:justify-center",
					)}
				>
					{items.map((item) => (
						<Card
							key={item.id}
							className="flex w-[calc((100vw-52px)/1.15)] flex-none flex-col gap-6 sm:w-[55vw] md:w-80"
						>
							<p className="text-base text-foreground leading-5">{item.quote}</p>
							<div className="mt-auto">
								<p className="font-medium text-base text-foreground leading-5">{item.author}</p>
								{item.role && (
									<p className="text-[15px] text-muted-foreground leading-5">{item.role}</p>
								)}
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
