import { Resend } from "resend";

export async function POST(req: Request) {
	const resend = new Resend(process.env.RESEND_API_KEY);
	const { firstName, lastName, email, message } = await req.json();

	if (!firstName || !lastName || !email || !message) {
		return Response.json({ error: "Champs manquants" }, { status: 400 });
	}

	const { error } = await resend.emails.send({
		// TODO prod : remplacer par "Formulaire Drawalign <contact@draw-align.com>" une fois le domaine draw-align.com vérifié sur resend.com/domains
		from: "Formulaire Drawalign <onboarding@resend.dev>",
		// TODO prod : remplacer par "contact@draw-align.com"
		to: "paradisepapers.dev@gmail.com",
		replyTo: email,
		subject: `Nouveau message de ${firstName} ${lastName}`,
		text: `Nom : ${lastName}\nPrénom : ${firstName}\nEmail : ${email}\n\n${message}`,
	});

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json({ success: true });
}
