import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { ConvictionItem, CtaLink } from "@/type";

type Props = {
	principles_title: string | null;
	principles_items: ConvictionItem[] | null;
	theoretical_title: string | null;
	theoretical_items: ConvictionItem[] | null;
	section3_cta: CtaLink | null;
};

function ItemList({ items }: { items: ConvictionItem[] }) {
	return (
		<div className="flex flex-col gap-6">
			{items.map((item) => (
				<div key={item.id} className="border-foreground border-l px-5">
					<p className="text-lg leading-normal">
						<strong>{item.title}</strong>
						{item.text && ` : ${item.text}`}
					</p>
				</div>
			))}
		</div>
	);
}

export function MethodePrincipes({
	principles_title,
	principles_items,
	theoretical_title,
	theoretical_items,
	section3_cta,
}: Props) {
	if (!principles_items?.length && !theoretical_items?.length) return null;

	return (
		<Section variant="px80" className="flex flex-col gap-10 pb-12 md:pb-20">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{principles_items?.length ? (
					<Card variant="light" className="flex flex-col gap-8">
						{principles_title && (
							<h2 className="text-2xl uppercase md:text-3xl">{principles_title}</h2>
						)}
						<ItemList items={principles_items} />
					</Card>
				) : null}

				{theoretical_items?.length ? (
					<Card variant="light" className="flex flex-col gap-8">
						{theoretical_title && (
							<h2 className="text-2xl uppercase md:text-3xl">{theoretical_title}</h2>
						)}
						<ItemList items={theoretical_items} />
					</Card>
				) : null}
			</div>

			{section3_cta && (
				<div className="flex justify-center">
					<Button href={section3_cta.href}>
						<span className="flex items-center gap-2">
							{section3_cta.label}
							<ArrowIcon />
						</span>
					</Button>
				</div>
			)}
		</Section>
	);
}
