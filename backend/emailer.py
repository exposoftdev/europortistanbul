import os
import asyncio
import logging
import resend

logger = logging.getLogger("emailer")

LABELS = {
    "stand": "Stand enquiry", "sponsorship": "Sponsorship enquiry", "visa": "Visa invitation letter request",
    "press": "Press accreditation", "visitor": "Visitor interest", "contact": "Contact message", "newsletter": "Newsletter subscription",
}


def _shell(title: str, body_rows: str, footer: str) -> str:
    return f"""<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:32px 0;font-family:Nunito,Arial,sans-serif;">
<tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #DCE1EA;border-radius:8px;overflow:hidden;">
<tr><td style="background:#07255C;padding:28px 32px;">
<p style="margin:0;color:#797AAF;font-family:'IBM Plex Mono',Courier,monospace;font-size:11px;letter-spacing:2px;">EUROPORT ISTANBUL · 4–6 NOVEMBER 2026</p>
<p style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:800;">{title}</p></td></tr>
<tr><td style="padding:28px 32px;color:#07255C;font-size:15px;line-height:1.6;">{body_rows}</td></tr>
<tr><td style="padding:18px 32px;border-top:1px solid #DCE1EA;color:#4F5D7A;font-size:12px;">{footer}<br/><span style="font-family:'IBM Plex Mono',Courier,monospace;color:#797AAF;">41°00'N 28°57'E · Two Continents. One Course.</span></td></tr>
</table></td></tr></table>"""


def _rows(lead: dict) -> str:
    items = [("Type", LABELS.get(lead["type"], lead["type"])), ("Name", lead["name"]), ("Email", lead["email"]), ("Company", lead["company"]),
             ("Country", lead["country"]), ("Phone", lead["phone"]), ("Message", lead["message"]), ("Page", lead["page"])]
    items += [(k.replace("_", " ").title(), str(v)) for k, v in lead.get("fields", {}).items()]
    items += [(f"UTM {k}", str(v)) for k, v in lead.get("utm", {}).items() if v]
    return "".join(f"<p style='margin:0 0 10px'><strong>{k}:</strong> {v}</p>" for k, v in items if v)


async def send_lead_emails(lead: dict) -> str:
    api_key = os.environ.get("RESEND_API_KEY")
    sender = os.environ.get("SENDER_EMAIL")
    inbox = os.environ.get("LEADS_INBOX")
    if not api_key or not sender or not inbox:
        logger.warning("Resend not configured; skipping emails for lead %s", lead["email"])
        return "skipped"
    resend.api_key = api_key
    label = LABELS.get(lead["type"], "Enquiry")
    team = {"from": sender, "to": [inbox], "subject": f"[Europort Istanbul] {label} — {lead['company'] or lead['name'] or lead['email']}",
            "html": _shell(label, _rows(lead), "New lead from europort.com.tr")}
    confirm = {"from": sender, "to": [lead["email"]], "subject": f"We received your {label.lower()} — Europort Istanbul 2026",
               "html": _shell("Thank you. Course set.", f"<p>Dear {lead['name'] or 'colleague'},</p><p>We have received your {label.lower()}. A member of the Europort Istanbul team will reply within two working days.</p><p>Europort Istanbul · 4–6 November 2026 · Yenikapı Expo Center</p>", "This is an automated confirmation. Reply to this email to reach the team.")}
    try:
        await asyncio.to_thread(resend.Emails.send, team)
        await asyncio.to_thread(resend.Emails.send, confirm)
        return "sent"
    except Exception as e:
        logger.error("Resend failed: %s", e)
        return "failed"
