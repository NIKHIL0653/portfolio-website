import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { firstName, phone, email, message } = await request.json()

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: `"${firstName}" <${process.env.GMAIL_USER}>`,
      to: 'nikhil0653@gmail.com',
      replyTo: email, // This allows replying directly to the sender
      subject: `Portfolio Contact: Message from ${firstName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 15px;">Contact Details:</h3>
            <p><strong>Name:</strong> ${firstName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 15px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p><strong>Reply to this email to respond directly to ${firstName}.</strong></p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Details:
Name: ${firstName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
This message was sent from your portfolio contact form.
Reply to this email to respond directly to ${firstName}.
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}