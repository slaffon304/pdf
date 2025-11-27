import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const isHuman = !update.message.from.is_bot;

      // 1️⃣  Реагируем на /start
      if (text === "/start") {
        if (isHuman) {
          const message =
            "Hello! 👋\nI'll help you get the file you need.\n\n" +
            "To get the rules, send the command\n /rules";
          await bot.sendMessage(chatId, message);
        } else {
          await bot.sendMessage(chatId, "I don't give PDFs to bots. 🤖");
        }
      }

      // 2️⃣ Команда /rules
      if (text === "/rules" && isHuman) {
        const pdfUrl = "https://pdf-kappa-five.vercel.app/97_rules.pdf"; // без пробелов и редиректов
        await bot.sendDocument(chatId, pdfUrl, {}, {
          filename: "97_rules.pdf",
          contentType: "application/pdf"
        });
      }
    }

    res.status(200).send("OK");
    return;
  }

  // Проверка в браузере
  res.status(200).send("bot ok");
}
