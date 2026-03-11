import type { Metadata } from "next";
import { MethodeDiagram } from "@/components/methode/MethodeDiagram";
import { MethodeHero } from "@/components/methode/MethodeHero";
import { MethodeMaturity } from "@/components/methode/MethodeMaturity";
import { MethodePrincipes } from "@/components/methode/MethodePrincipes";
import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { getGlobal, getMethodeHldbPage, getStrapiImageUrl } from "@/lib/strapi";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const [page, global] = await Promise.all([getMethodeHldbPage(locale), getGlobal(locale)]);

	const title = page?.seo?.metaTitle || undefined;
	const description = page?.seo?.metaDescription || global?.seo?.metaDescription;
	const ogImage = page?.seo?.ogImage || global?.seo?.ogImage;

	return {
		title: title ?? undefined,
		description: description ?? undefined,
		openGraph: {
			title: title ?? undefined,
			description: description ?? undefined,
			images: ogImage
				? [
						{
							url: getStrapiImageUrl(ogImage.url),
							width: ogImage.width,
							height: ogImage.height,
							alt: ogImage.alternativeText ?? title ?? "",
						},
					]
				: [],
		},
	};
}

export default async function MethodeHldbPage({ params }: Props) {
	const { locale } = await params;
	const page = await getMethodeHldbPage(locale);

	if (!page) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p className="text-zinc-500">Méthode HLDB page not published yet. (locale: {locale})</p>
			</main>
		);
	}

	return (
		<main>
			{page.hero && <MethodeHero hero={page.hero} diagram={page.hero_diagram} />}
			{(page.diagram_left || page.diagram_right || page.diagram_center_title) && (
				<MethodeDiagram
					center_title={page.diagram_center_title}
					center_text={page.diagram_center_text}
					left={page.diagram_left}
					right={page.diagram_right}
				/>
			)}
			<MethodePrincipes
				principles_title={page.principles_title}
				principles_items={page.principles_items}
				theoretical_title={page.theoretical_title}
				theoretical_items={page.theoretical_items}
				section3_cta={page.section3_cta}
			/>
			{page.fullWidthImage && <FullWidthImage image={page.fullWidthImage} />}
			{(page.maturity_title ||
				page.maturity_text ||
				page.highlight_text ||
				page.maturity_image) && (
				<MethodeMaturity
					maturity_title={page.maturity_title}
					maturity_text={page.maturity_text}
					highlight_title={page.highlight_title}
					highlight_text={page.highlight_text}
					maturity_cta={page.maturity_cta}
					maturity_image={page.maturity_image}
				/>
			)}
		</main>
	);
}
