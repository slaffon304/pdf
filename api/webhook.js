import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN);

export default async function handler(req, res) {
  // Telegram шлёт POST-запрос по этому эндпоинту
  if (req.method === "POST") {
    const update = req.body;

    if (update.message && update.message.text === "/start") {
      const chatId = update.message.chat.id;
      const fromHuman = !update.message.from.is_bot;

      if (fromHuman) {
        const pdfUrl = `https://${process.env.VERCEL_URL}/file.pdf`;
        await bot.sendDocument(chatId, pdfUrl, {}, {
          filename: "document.pdf",
          contentType: "application/pdf"
        });
      } else {
        await bot.sendMessage(chatId, "Ботам PDF не выдаю 🤖");
      }
    }

    res.status(200).send("OK");
    return;
  }

  // Проверка в браузере
  res.status(200).send("bot ok");
}
