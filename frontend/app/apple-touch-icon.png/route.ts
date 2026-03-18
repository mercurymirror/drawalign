import { getGlobal } from "@/lib/strapi";

export async function GET() {
	const global = await getGlobal();
	const iconUrl = global?.square_logo_icon?.url;

	if (!iconUrl) {
		return new Response(null, { status: 404 });
	}

	const image = await fetch(iconUrl);
	const buffer = await image.arrayBuffer();

	return new Response(buffer, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=86400",
		},
	});
}
