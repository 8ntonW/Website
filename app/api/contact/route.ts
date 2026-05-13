import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    phone,
    company,
    website,
    goal,
    state,
    budget,
    deadline,
    notes,
    email,
  } = body;

  const row = (label: string, value: string) =>
    value ? `<tr><td style="padding:8px 0;color:#9a9898;font-size:13px;width:180px;vertical-align:top">${label}</td><td style="padding:8px 0;color:#fdfcfc;font-size:13px">${value}</td></tr>` : "";

  const html = `
    <div style="background:#201d1d;padding:48px 40px;font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;border-radius:8px">
      <p style="color:#9a9898;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 32px">antonwdmn.studio — New Project Inquiry</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(255,255,255,0.1)">
        ${row("Name", name)}
        ${row("Email", email)}
        ${row("Phone", phone)}
        ${row("Company", company)}
        ${row("Website", website)}
        ${row("Primary Goal", goal)}
        ${row("Production State", state)}
        ${row("Investment", budget)}
        ${row("Deadline", deadline)}
      </table>
      ${notes ? `
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1)">
          <p style="color:#9a9898;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px">Additional Notes</p>
          <p style="color:#fdfcfc;font-size:14px;line-height:1.7;margin:0">${notes}</p>
        </div>
      ` : ""}
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "antonwdmn.studio <onboarding@resend.dev>",
    to: "kontakt@antonediting.com",
    replyTo: email,
    subject: "New project inquiry — antonwdmn.studio",
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
