import { StrapiImage } from "@/components/ui/StrapiImage";
import type { PageHeroData, StrapiImage as StrapiImageType } from "@/type";

type Props = {
	hero: PageHeroData;
	diagram?: StrapiImageType | null;
};

export function MethodeHero({ hero, diagram }: Props) {
	return (
		<section className="w-full bg-primary text-white">
			<div className="mx-auto flex max-w-9xl flex-col gap-10 px-10 py-20 md:py-16">
				{hero.eyebrow && <p className="text-2xl">{hero.eyebrow}</p>}
				<h1 className="text-4xl md:text-[40px]">{hero.title}</h1>
				{hero.text && <p className="text-lg leading-normal">{hero.text}</p>}
				{diagram && (
					<div className="flex justify-center pt-4">
						<StrapiImage image={diagram} className="w-full max-w-sm md:max-w-md" />
					</div>
				)}
			</div>
		</section>
	);
}
