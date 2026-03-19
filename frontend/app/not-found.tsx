import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4 px-8">
			<h2 className="font-bold text-2xl">Page introuvable</h2>
			<Link href="/" className="text-sm underline underline-offset-4 hover:text-zinc-600">
				Retour à l'accueil
			</Link>
		</main>
	);
}
