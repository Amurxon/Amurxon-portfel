const toggleBtn = document.getElementById("modeToggle");
const body = document.body;

toggleBtn.onclick = () => {
  body.classList.toggle("dark");
  toggleBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
};

const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const message = `📝 Yangi murojaat\n👤 Ismi: ${data.get("name")}\n📞 Tel: ${data.get("phone")}\n💬 Xabar: ${data.get("message")}`;

  const response = await fetch(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: "<YOUR_CHAT_ID>",
      text: message
    })
  });

  if (response.ok) {
    status.textContent = "Xabaringiz yuborildi!";
    form.reset();
  } else {
    status.textContent = "Xatolik yuz berdi.";
  }
});
