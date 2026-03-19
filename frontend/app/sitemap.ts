import type { MetadataRoute } from "next";
import { getAllPages, getArticles } from "@/lib/strapi";
import type { ArticleCard, Page } from "@/type";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LOCALES = ["fr", "en"] as const;

function localizedUrl(path: string, locale: (typeof LOCALES)[number]): string {
	const prefix = locale === "fr" ? "" : "/en";
	return `${BASE_URL}${prefix}${path}`;
}

const STATIC_ROUTES = [
	"/",
	"/expertises",
	"/methode-hldb",
	"/solutions",
	"/partenaires",
	"/contact",
	"/ressources",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const entries: MetadataRoute.Sitemap = [];

	// Static routes — both locales
	for (const locale of LOCALES) {
		for (const route of STATIC_ROUTES) {
			entries.push({
				url: localizedUrl(route, locale),
				changeFrequency: "weekly",
				priority: route === "/" ? 1.0 : 0.8,
			});
		}
	}

	// Dynamic pages (page builder) — both locales
	for (const locale of LOCALES) {
		let pages: Page[] = [];
		try {
			pages = await getAllPages(locale);
		} catch {
			// Strapi unavailable during build
		}
		for (const page of pages) {
			entries.push({
				url: localizedUrl(`/${page.slug}`, locale),
				lastModified: page.updatedAt,
				changeFrequency: "weekly",
				priority: 0.7,
			});
		}
	}

	// Articles — both locales
	for (const locale of LOCALES) {
		let articles: ArticleCard[] = [];
		try {
			articles = await getArticles(locale);
		} catch {
			// Strapi unavailable during build
		}
		for (const article of articles) {
			entries.push({
				url: localizedUrl(`/ressources/${article.slug}`, locale),
				changeFrequency: "monthly",
				priority: 0.6,
			});
		}
	}

	return entries;
}
