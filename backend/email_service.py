import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Optional

from config import get_settings

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────
#  HTML email template
# ─────────────────────────────────────────
def _build_html(name: str, email: str, phone: Optional[str], subject: str, message: str) -> str:
    escaped_message = message.replace("\n", "<br/>")
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body {{ font-family: 'Segoe UI', sans-serif; background: #0f0f17; color: #e2e8f0; margin: 0; padding: 0; }}
        .wrapper {{ max-width: 600px; margin: 40px auto; background: #1a1a2e; border-radius: 16px;
                    border: 1px solid #2d2d4e; overflow: hidden; }}
        .header {{ background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
                   padding: 32px 40px; text-align: center; }}
        .header h1 {{ margin: 0; font-size: 24px; color: #fff; letter-spacing: -0.5px; }}
        .header p {{ margin: 6px 0 0; color: rgba(255,255,255,0.75); font-size: 14px; }}
        .body {{ padding: 36px 40px; }}
        .label {{ font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
                  color: #7c3aed; margin-bottom: 4px; }}
        .value {{ background: #0f0f17; border: 1px solid #2d2d4e; border-radius: 10px;
                  padding: 12px 16px; font-size: 14px; color: #e2e8f0; margin-bottom: 20px; }}
        .message-box {{ background: #0f0f17; border: 1px solid #3b82f6; border-radius: 10px;
                        padding: 16px 20px; line-height: 1.7; font-size: 14px; color: #e2e8f0; }}
        .footer {{ padding: 20px 40px; border-top: 1px solid #2d2d4e; text-align: center;
                   font-size: 12px; color: #64748b; }}
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>📬 New Portfolio Message</h1>
          <p>Someone reached out via your portfolio contact form</p>
        </div>
        <div class="body">
          <div class="label">From</div>
          <div class="value">{name} &lt;{email}&gt;</div>

          {'<div class="label">Phone</div><div class="value">' + phone + '</div>' if phone else ''}

          <div class="label">Subject</div>
          <div class="value">{subject}</div>

          <div class="label">Message</div>
          <div class="message-box">{escaped_message}</div>
        </div>
        <div class="footer">
          Sent from <strong>lalith-portfolio.dev</strong> contact form &mdash; Reply directly to {email}
        </div>
      </div>
    </body>
    </html>
    """


def _build_plain(name: str, email: str, phone: Optional[str], subject: str, message: str) -> str:
    phone_line = f"Phone  : {phone}\n" if phone else ""
    return (
        f"New message from your portfolio\n"
        f"{'=' * 40}\n"
        f"From   : {name} <{email}>\n"
        f"{phone_line}"
        f"Subject: {subject}\n"
        f"{'=' * 40}\n"
        f"{message}\n"
    )


# ─────────────────────────────────────────
#  Send contact email
# ─────────────────────────────────────────
def send_contact_email(
    name: str,
    email: str,
    phone: Optional[str],
    subject: Optional[str],
    message: str,
) -> bool:
    """
    Send an email notification when the contact form is submitted.
    Returns True on success, False on failure.
    If SMTP_USER is not configured, logs the submission and returns True
    so the API still responds with success in development.
    """
    settings = get_settings()
    subject = subject or "New Portfolio Contact"

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.warning(
            "SMTP not configured — skipping email send. "
            "Set SMTP_USER and SMTP_PASSWORD in .env to enable email notifications."
        )
        logger.info("Contact submission: name=%s | email=%s | subject=%s", name, email, subject)
        return True  # graceful degradation

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio] {subject}"
        msg["From"] = f"Portfolio Bot <{settings.SMTP_USER}>"
        msg["To"] = settings.CONTACT_EMAIL
        msg["Reply-To"] = email

        msg.attach(MIMEText(_build_plain(name, email, phone, subject, message), "plain"))
        msg.attach(MIMEText(_build_html(name, email, phone, subject, message), "html"))

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_USER, settings.CONTACT_EMAIL, msg.as_string())

        logger.info("Contact email sent successfully from %s", email)
        return True

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed — check SMTP_USER / SMTP_PASSWORD")
        return False
    except smtplib.SMTPException as exc:
        logger.error("SMTP error while sending email: %s", exc)
        return False
    except Exception as exc:
        logger.error("Unexpected error in send_contact_email: %s", exc)
        return False
