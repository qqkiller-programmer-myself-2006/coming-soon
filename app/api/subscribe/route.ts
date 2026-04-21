import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "placeholder");

const schema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);
    const resend = getResend();

    // 1. แจ้งเจ้าของ
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.NOTIFY_EMAIL!,
      subject: `🔔 มีคนสมัครรับข่าวสาร: ${email}`,
      html: `
        <div style="font-family:sans-serif;padding:24px;background:#f8fafc;border-radius:12px;">
          <h2 style="color:#6366f1;">มีผู้สนใจใหม่! 🎉</h2>
          <p>Email: <strong>${email}</strong></p>
          <p style="color:#64748b;font-size:14px;">ส่งจาก Coming Soon page</p>
        </div>
      `,
    });

    // 2. ขอบคุณผู้สมัคร
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "ขอบคุณที่สนใจ! เราจะแจ้งคุณเร็วๆ นี้ 🚀",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0f0c29;color:#f8fafc;border-radius:16px;">
          <h1 style="color:#a78bfa;font-size:24px;">ขอบคุณ! 🙏</h1>
          <p style="color:#cbd5e1;line-height:1.6;">
            เราได้รับ email ของคุณแล้ว<br/>
            เราจะแจ้งให้ทราบทันทีเมื่อพร้อม
          </p>
          <hr style="border:1px solid rgba(255,255,255,0.1);margin:24px 0;"/>
          <p style="color:#64748b;font-size:12px;">
            หากไม่ได้สมัคร กรุณาเพิกเฉยอีเมลนี้
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
