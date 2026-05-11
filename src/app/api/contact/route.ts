import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, organization, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
      <h3>Message:</h3>
      <p>${String(message).replace(/\n/g, '<br>')}</p>
    `

    const emailText = `
New Contact Form Submission

From: ${firstName} ${lastName}
Email: ${email}
${organization ? `Organization: ${organization}` : ''}

Message:
${message}
    `

    await sendEmail({
      to: process.env.CONTACT_RECIPIENT || 'info@collabdt.org',
      subject: `Contact Form: Message from ${firstName} ${lastName}`,
      html: emailHtml,
      text: emailText,
    })

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    )
  }
}
