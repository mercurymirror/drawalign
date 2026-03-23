import { Resend } from "resend";

export async function POST(req: Request) {
	const resend = new Resend(process.env.RESEND_API_KEY);
	const { firstName, lastName, email, message } = await req.json();

	if (!firstName || !lastName || !email || !message) {
		return Response.json({ error: "Champs manquants" }, { status: 400 });
	}

	const { error } = await resend.emails.send({
		from: "Formulaire Drawalign <contact@draw-align.com>",
		to: "contact@draw-align.com",
		replyTo: email,
		subject: `Nouveau message de ${firstName} ${lastName}`,
		text: `Nom : ${lastName}\nPrénom : ${firstName}\nEmail : ${email}\n\n${message}`,
	});

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json({ success: true });
}
