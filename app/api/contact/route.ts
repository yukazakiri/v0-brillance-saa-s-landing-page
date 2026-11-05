import { NextResponse } from "next/server"

interface ContactRequestBody {
  name?: string
  email?: string
  category?: string
  subject?: string
  message?: string
  // Honeypot field for bot spam detection
  hp_website?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody
    const { name, email, category, subject, message, hp_website } = body

    // Honeypot caught a bot - return 200 silently to prevent retry loops
    if (hp_website && hp_website.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Thank you for your message." },
        { status: 200 }
      )
    }

    // Input validation
    const trimmedName = name?.trim() ?? ""
    const trimmedEmail = email?.trim() ?? ""
    const trimmedMessage = message?.trim() ?? ""
    const cleanCategory = category?.trim() || "General Inquiry"
    const cleanSubject = subject?.trim() || `Inquiry from ${trimmedName} (${cleanCategory})`

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmail =
      process.env.CONTACT_EMAIL_TO ||
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
      "baguio-campus@dccph.edu.ph"
    const fromAddress =
      process.env.CONTACT_EMAIL_FROM || "Data Center College <onboarding@resend.dev>"

    // If Resend API key is not yet configured, log submission gracefully for dev testing
    if (!resendApiKey) {
      console.info("[Contact Form Received - Dev / Simulation Mode]:", {
        to: recipientEmail,
        from: trimmedEmail,
        name: trimmedName,
        category: cleanCategory,
        subject: cleanSubject,
        message: trimmedMessage,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: true,
          mocked: true,
          message:
            "Thank you! Your message was received (Simulation mode: add RESEND_API_KEY to send live email).",
        },
        { status: 200 }
      )
    }

    // Call Resend REST API directly - zero extra dependencies required
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e7dfd5; border-radius: 8px; background-color: #faf8f5;">
        <div style="border-bottom: 2px solid #b89768; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="color: #1a2a44; font-size: 22px; margin: 0;">New Contact Form Message</h1>
          <p style="color: #7b6d5c; font-size: 14px; margin: 6px 0 0 0;">Received from website contact form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #7b6d5c; font-size: 14px; width: 120px;"><strong>Sender Name:</strong></td>
            <td style="padding: 8px 0; color: #1a2a44; font-size: 15px;">${escapeHtml(trimmedName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7b6d5c; font-size: 14px;"><strong>Email Address:</strong></td>
            <td style="padding: 8px 0; color: #1a2a44; font-size: 15px;"><a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #1a2a44; text-decoration: underline;">${escapeHtml(trimmedEmail)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7b6d5c; font-size: 14px;"><strong>Inquiry Type:</strong></td>
            <td style="padding: 8px 0; color: #1a2a44; font-size: 15px;"><span style="background-color: #e9e2d5; padding: 3px 8px; border-radius: 4px; font-size: 13px;">${escapeHtml(cleanCategory)}</span></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7b6d5c; font-size: 14px;"><strong>Subject:</strong></td>
            <td style="padding: 8px 0; color: #1a2a44; font-size: 15px;">${escapeHtml(cleanSubject)}</td>
          </tr>
        </table>

        <div style="background-color: #ffffff; border: 1px solid #e2d9cc; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
          <h3 style="color: #7b6d5c; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Message Content</h3>
          <p style="color: #242220; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</p>
        </div>

        <div style="border-top: 1px solid #e7dfd5; padding-top: 16px; font-size: 12px; color: #9c8e7e; text-align: center;">
          <p style="margin: 0;">Reply directly to this email to respond to ${escapeHtml(trimmedName)} (${escapeHtml(trimmedEmail)}).</p>
        </div>
      </div>
    `

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipientEmail],
        reply_to: trimmedEmail,
        subject: `[Website Contact] ${cleanSubject}`,
        html: emailHtml,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}))
      console.error("Resend API error:", errorData)
      return NextResponse.json(
        {
          error:
            errorData.message ||
            "Unable to deliver message right now. Please try again or contact us directly.",
        },
        { status: resendResponse.status }
      )
    }

    const data = await resendResponse.json().catch(() => ({}))

    return NextResponse.json(
      {
        success: true,
        id: data?.id,
        message: "Thank you! Your message has been sent successfully. We will be in touch soon.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact route unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message. Please try again." },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
