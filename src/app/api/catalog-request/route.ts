import { NextRequest, NextResponse } from "next/server";

type Payload = {
	product: string;
	quantity: string;
	email: string;
	phone: string;
};

function getEnv(name: string) {
	return process.env[name];
}

async function sendEmail(payload: Payload, aiHtml?: string, aiText?: string) {
	const smtpHost = getEnv("SMTP_HOST");
	const smtpPort = getEnv("SMTP_PORT");
	const smtpUser = getEnv("SMTP_USER");
	const smtpPass = getEnv("SMTP_PASS");
	const fromEmail = getEnv("FROM_EMAIL") || smtpUser;

	if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !fromEmail) return { ok: false, reason: "smtp_not_configured" };

	try {
		const nodemailer = (await import("nodemailer")).default;
		const transporter = nodemailer.createTransport({
			host: smtpHost,
			port: Number(smtpPort),
			secure: Number(smtpPort) === 465,
			auth: { user: smtpUser, pass: smtpPass },
		});
		await transporter.sendMail({
			from: fromEmail,
			to: payload.email,
			subject: `Catalog Request Confirmation - ${payload.product}`,
			text: aiText || `Thank you for your request.\n\nProduct: ${payload.product}\nQuantity: ${payload.quantity}\nWe will contact you on WhatsApp at ${payload.phone}.`,
			html: aiHtml || `<p>Thank you for your request.</p><p><strong>Product:</strong> ${payload.product}<br/><strong>Quantity:</strong> ${payload.quantity}<br/>We will contact you on WhatsApp at ${payload.phone}.</p>`,
		});
		return { ok: true };
	} catch (err) {
		return { ok: false, reason: "smtp_failed", error: String(err) };
	}
}

async function generateEmailBody(payload: Payload) {
	const apiKey = getEnv("OPENAI_API_KEY");
	if (!apiKey) return { ok: false as const, bodyText: undefined as string | undefined, bodyHtml: undefined as string | undefined };

	const system = "You are a helpful assistant that drafts short, friendly order request confirmations.";
	const user = `Create a short confirmation for a catalog request with these details:\nProduct: ${payload.product}\nQuantity: ${payload.quantity}\nEmail: ${payload.email}\nWhatsApp: ${payload.phone}. Keep it 3-5 sentences.`;

	try {
		const res = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{ role: "system", content: system },
					{ role: "user", content: user },
				],
				temperature: 0.5,
			}),
		});
		if (!res.ok) return { ok: false as const, bodyText: undefined, bodyHtml: undefined };
		const json = await res.json();
		const content: string = json?.choices?.[0]?.message?.content || "Thank you for your request.";
		return { ok: true as const, bodyText: content, bodyHtml: `<p>${content.replace(/\n/g, "<br/>")}</p>` };
	} catch {
		return { ok: false as const, bodyText: undefined, bodyHtml: undefined };
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as Partial<Payload>;
		const product = String(body.product || "").trim();
		const quantity = String(body.quantity || "").trim();
		const email = String(body.email || "").trim();
		const phone = String(body.phone || "").trim();

		if (!product || !quantity || !email || !phone) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		// Try to generate a friendly body via OpenAI (optional)
		const gen = await generateEmailBody({ product, quantity, email, phone });

		// Attempt to send email via SMTP if configured. If not configured, we still succeed but return the generated content.
		const emailRes = await sendEmail({ product, quantity, email, phone }, gen.bodyHtml, gen.bodyText);

		if (!emailRes.ok && !gen.ok) {
			return NextResponse.json(
				{ error: "Unable to send email and no AI-generated content available" },
				{ status: 502 }
			);
		}

		return NextResponse.json({ ok: true, email: emailRes.ok, content: gen.bodyText });
	} catch (err) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}


