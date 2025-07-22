from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)  # CORS ruxsat berish (frontenddan POST kelishi uchun)

# ⚠️ Buni o'z ma'lumotlaringizga almashtiring
EMAIL_ADDRESS = 'amurxonqurbonov112@gmail.com'
EMAIL_PASSWORD = 'cpol pema bppj krqj'  # Gmail uchun App password

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    transcript = data.get('transcript')
    email = data.get('email')
    open_date = data.get('openDate')

    if not transcript or not email:
        return jsonify({"status": "fail", "message": "Bo'sh maydonlar mavjud"}), 400

    msg = EmailMessage()
    msg['Subject'] = '📬 Sizdan kelgan xabar'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    msg.set_content(f"Assalomu alaykum!\n\nSiz quyidagi xabarni yubordingiz:\n\n\"{transcript}\"\n\nOchiladi: {open_date}")

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return jsonify({"status": "ok", "message": "Email yuborildi!"})
    except Exception as e:
        return jsonify({"status": "fail", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
