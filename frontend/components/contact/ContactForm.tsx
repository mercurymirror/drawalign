"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
	const [pending, setPending] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		setPending(true);
		setError(null);

		const form = e.currentTarget;
		const data = {
			firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
			lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
			email: (form.elements.namedItem("email") as HTMLInputElement).value,
			message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
		};

		const res = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		setPending(false);

		if (res.ok) {
			setSuccess(true);
			form.reset();
		} else {
			const body = await res.json();
			setError(body.error ?? "Une erreur est survenue.");
		}
	}

	if (success) {
		return (
			<p className="text-sm text-white">
				Merci, votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
			</p>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="grid grid-cols-1 gap-4 text-[#140D4A99]">
				<input
					name="lastName"
					placeholder="Nom"
					required
					className="rounded-lg bg-white px-4 py-3 outline-none focus:bg-white"
				/>
				<input
					name="firstName"
					placeholder="Prénom"
					required
					className="rounded-lg bg-white px-4 py-3 outline-none focus:bg-white"
				/>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					className="rounded-lg bg-white px-4 py-3 outline-none focus:bg-white"
				/>
				<textarea
					name="message"
					placeholder="Message"
					required
					rows={5}
					className="resize-none rounded-lg bg-white px-4 py-3 outline-none focus:bg-white"
				/>
			</div>
			{error && <p className="text-red-300 text-sm">{error}</p>}
			<div>
				<Button type="submit" variant="foreground" size="sm" disabled={pending}>
					{pending ? "Envoi…" : "Envoyer"}
				</Button>
			</div>
		</form>
	);
}
