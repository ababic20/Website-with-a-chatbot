from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from dotenv import load_dotenv
import os
import requests

load_dotenv()
router = APIRouter()

class ContactForm(BaseModel):
    fullName: str
    phone: str
    email: EmailStr
    address: str
    description: str
    captcha: str   

def get_limiter(request: Request):
    return request.app.state.limiter

def verify_captcha(token: str) -> bool:
    secret = os.getenv("RECAPTCHA_SECRET")
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {"secret": secret, "response": token}
    response = requests.post(url, data=payload)
    result = response.json()
    return result.get("success", False)

@router.post("/send-email")
async def send_email(request: Request, data: ContactForm, limiter=Depends(get_limiter)):
    @limiter.limit("5/minute")
    @limiter.limit("100/day")
    async def _inner(request: Request):
        if not verify_captcha(data.captcha):
            return {"error": "reCAPTCHA verification failed. Please try again."}

        sender_email = os.getenv("GMAIL_USER")
        sender_password = os.getenv("GMAIL_PASSWORD")
        receiver_email = os.getenv("GMAIL_RECEIVER") or sender_email

        msg_content = f"""
        New message from contact form:

        Full name: {data.fullName}
        Phone: {data.phone}
        Email: {data.email}
        Address: {data.address}
        Message:
        {data.description}
        """

        msg = MIMEText(msg_content, "plain", "utf-8")
        msg["Subject"] = "New message from website"
        msg["From"] = formataddr(("Web contact form", sender_email))
        msg["To"] = receiver_email
        msg["Reply-To"] = data.email  

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, receiver_email, msg.as_string())
            print("Email was sent successfully.")
            return {"message": "Email was sent successfully."}
        except Exception as e:
            print("Error while sending email:", e)
            return {"error": "Failed to send email. Check settings."}

    return await _inner(request)
