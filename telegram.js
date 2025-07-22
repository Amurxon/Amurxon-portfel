document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const status = document.getElementById("status");
  
    const botToken = "8134060532:AAEYVaz5kAs05PIbOfOty77Dzkfev-1jKVA"; // <-- Bu yerga o'z Telegram bot tokeningizni yozing
    const chatId = "7786081868";     // <-- Bu yerga o'z Telegram ID (yoki kanal ID) yozing
    const text = `📨 Yangi xabar!\n👤 Ism: ${name}\n💬 Xabar: ${message}`;
  
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text
      })
    })
    .then(res => res.ok ? status.innerText = "✅ Xabar yuborildi!" : status.innerText = "❌ Xatolik yuz berdi.")
    .catch(err => status.innerText = "❌ Xatolik: " + err);
  });
  