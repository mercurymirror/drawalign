import { BoldPrefixText } from "@/components/ui/BoldPrefixText";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import type { CtaLink, ListItem, StrapiImage as StrapiImageType } from "@/type";

type SplitItem = {
	id: number;
	name?: string | null;
	logo?: StrapiImageType | null;
	background?: "primary" | "secondary" | null;
	title?: string | null;
	description?: string | null;
	features?: ListItem[] | null;
	image?: StrapiImageType | null;
};

type Props = {
	eyebrow?: string | null;
	title?: string | null;
	button?: CtaLink | null;
	items: SplitItem[];
};

const bgMap = {
	primary: { bg: "bg-primary", text: "text-white" },
	secondary: { bg: "bg-secondary", text: "text-white" },
};

export function HomeSolutions({ eyebrow, title, button, items }: Props) {
	return (
		<Section>
			{title && <SectionHeader eyebrow={eyebrow} title={title} className="mb-12" />}

			<div className="flex flex-col gap-5 md:px-5">
				{items.map((item, index) => {
					const style = bgMap[item.background ?? "primary"];
					const isEven = index % 2 === 0;
					return (
						<div
							key={item.id}
							className={cn(
								"grid overflow-hidden rounded-2xl md:grid-cols-2",
								style.bg,
								isEven ? "md:mr-[15%]" : "md:ml-[15%]",
							)}
						>
							{/* Image */}
							{item.image && (
								<div
									className={cn(
										"py-10",
										isEven ? "md:pl-20" : "md:pr-20",
										!isEven && "md:order-last",
									)}
								>
									<div className="relative min-h-60 md:h-full">
										<StrapiImage image={item.image} fill className="object-contain" />
									</div>
								</div>
							)}
							{/* Contenu */}
							<div
								className={cn(
									"flex flex-col gap-10 py-10 lg:py-16",
									isEven ? "pr-10 pl-5 lg:pr-20" : "pr-5 pl-10 lg:pl-20",
									style.text,
								)}
							>
								<div className="flex flex-col gap-6">
									{item.logo && (
										<div className="flex gap-2">
											<StrapiImage
												image={item.logo}
												alt={item.logo.alternativeText ?? item.name ?? ""}
												className={cn(
													"h-8 w-auto self-start object-contain",
													!isEven && "order-last",
												)}
											/>
											<p className="self-start font-medium text-[40px] text-foreground leading-[0.9]">
												{item.name}
											</p>
										</div>
									)}
									{item.title && (
										<h3 className="max-w-3xs text-3xl tracking-tighter lg:text-4xl">
											{item.title}
										</h3>
									)}
									{item.description && (
										<p className="text-sm tracking-[-4.5%] lg:text-base">{item.description}</p>
									)}
									{item.features && item.features.length > 0 && (
										<ul className="flex flex-col gap-4">
											{item.features.map((f) => (
												<li
													key={f.id}
													className="flex items-start gap-2 border-white border-l px-5 font-medium text-sm text-white"
												>
													<BoldPrefixText text={f.text} />
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{button && (
				<div className="mt-10 flex justify-center">
					<Button href={button.href}>{button.label}</Button>
				</div>
			)}
		</Section>
	);
}
