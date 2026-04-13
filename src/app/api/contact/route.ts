import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(str: string | undefined): string {
  return (str || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").trim().slice(0, 2000);
}

export async function POST(req: Request) {
  try {
    const { name, company, email, phone, message, inquiryType, website } =
      await req.json();

    // SECURITY: honeypot check
    if (website) {
      return NextResponse.json({ success: true });
    }

    const sName = sanitize(name);
    const sCompany = sanitize(company);
    const sEmail = sanitize(email);
    const sPhone = sanitize(phone);
    const sMessage = sanitize(message);
    const sInquiryType = sanitize(inquiryType);

    if (!sName || !sCompany || !sEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Aprium Website <noreply@aprium.ai>",
      to: ["drew@aprium.ai", "ondrej@aprium.ai"],
      replyTo: sEmail,
      subject: `Aprium Inquiry — ${sInquiryType} | ${sName}`,
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${sName}</p>
        <p><strong>Company:</strong> ${sCompany}</p>
        <p><strong>Email:</strong> ${sEmail}</p>
        <p><strong>Phone:</strong> ${sPhone || "Not provided"}</p>
        <p><strong>Inquiry Type:</strong> ${sInquiryType}</p>
        <p><strong>Message:</strong><br/>${sMessage || "No message provided"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
