from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

class ContactForm(BaseModel):
    fullName: str
    phone: str
    email: EmailStr
    address: str
    description: str

@router.post("/send-email")
def send_email(data: ContactForm):
    sender_email = os.getenv("GMAIL_USER")
    sender_password = os.getenv("GMAIL_PASSWORD")
    receiver_email = os.getenv("GMAIL_RECEIVER") or sender_email

    msg_content = f"""
    📬 Nova poruka s kontakt forme:

    👤 Ime i prezime: {data.fullName}
    📞 Telefon: {data.phone}
    📧 E-mail: {data.email}
    🏠 Adresa: {data.address}
    📝 Poruka:
    {data.description}
    """

    msg = MIMEText(msg_content, "plain", "utf-8")
    msg["Subject"] = "📨 Nova poruka s web stranice"
    msg["From"] = formataddr(("Web kontakt forma", sender_email))
    msg["To"] = receiver_email
    msg["Reply-To"] = data.email  

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        return {"message": "Email je uspješno poslan."}
    except Exception as e:
        print("Greška prilikom slanja emaila:", e)
        return {"error": "Neuspješno slanje emaila. Provjerite postavke."}
