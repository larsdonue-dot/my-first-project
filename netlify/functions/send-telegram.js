/**
 * Netlify Function для отправки уведомлений в Telegram
 * Триггер: POST запрос от контактной формы
 * 
 * Требуемые переменные окружения:
 * - TELEGRAM_BOT_TOKEN: токен вашего Telegram бота от BotFather
 * - TELEGRAM_CHAT_ID: ваш chat ID для получения уведомлений
 */

exports.handler = async (event) => {
  // Только POST запросы
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Парсим данные из формы
    const data = JSON.parse(event.body);
    const { name, email, phone, message } = data;

    // Получаем переменные окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Проверяем наличие необходимых переменных
    if (!botToken || !chatId) {
      console.warn('Telegram credentials not configured');
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Form received (Telegram not configured)',
        }),
      };
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
📝 <b>Новая заявка с сайта</b>

<b>Имя:</b> ${escapeHtml(name)}
<b>Email:</b> ${escapeHtml(email)}
${phone ? `<b>Телефон:</b> ${escapeHtml(phone)}\n` : ''}
<b>Сообщение:</b>
<pre>${escapeHtml(message)}</pre>
    `.trim();

    // Отправляем в Telegram через Bot API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Form received (Telegram delivery issue)',
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Notification sent to Telegram',
      }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Form received',
      }),
    };
  }
};

/**
 * Экранирует HTML символы для безопасности в Telegram
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
