import axios from 'axios';

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; 
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'; 

export async function sendTelegramNotification(message) {
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
        });

        console.log("Уведомление отправлено в Telegram:", response.data);
    } catch (error) {
        console.error("Ошибка отправки в Telegram:", error);
    }
}
