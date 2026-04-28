# Контактная форма с Netlify Forms и Telegram

## 📋 Описание

Полностью настроенная контактная форма с поддержкой:
- **Netlify Forms** — сохранение всех заявок в Netlify
- **Email-уведомления** — на адрес zmitro@mail.ru
- **Telegram-уведомления** — через Netlify Function и Telegram Bot API
- **Graceful degradation** — форма работает даже если Telegram недоступен

## 🚀 Быстрый старт

### 1. Подготовка Telegram бота

#### Шаг 1: Создать бота через BotFather

1. Откройте Telegram и найдите **@BotFather**
2. Отправьте команду `/newbot`
3. Следуйте инструкциям:
   - Введите имя бота (например: "My Site Notifications")
   - Введите username бота (должен заканчиваться на `_bot`, например: `my_site_notifications_bot`)
4. **Скопируйте токен** (выглядит так: `123456789:ABCDEFGHIJKLMNoPqrsTuvWxYZ`)

#### Шаг 2: Получить ваш Chat ID

1. Откройте полученный бот (нажмите "Start")
2. Отправьте боту любое сообщение (например: "test")
3. Откройте в браузере (замените `BOT_TOKEN` на ваш токен):
   ```
   https://api.telegram.org/botBOT_TOKEN/getUpdates
   ```
4. Найдите в ответе поле `"id"` объекта `"chat"` — это и есть ваш **Chat ID**
5. Скопируйте этот ID

### 2. Синхронизация GitHub

```bash
# Если ещё не инициализировали git:
git init

# Добавьте все файлы
git add .

# Закоммитьте
git commit -m "Initial commit: contact form with Netlify Forms"

# Добавьте origin
git remote add origin https://github.com/ваш-юзер/ваш-репо.git

# Отправьте на GitHub
git push -u origin main
```

### 3. Развёртывание на Netlify

#### Вариант A: Через Netlify UI (рекомендуется)

1. Откройте [Netlify.com](https://netlify.com)
2. Нажмите "Add new site" → "Import an existing project"
3. Выберите GitHub
4. Авторизуйтесь и выберите ваш репозиторий
5. Netlify автоматически обнаружит `netlify.toml` и настроит деплой

#### Вариант B: Через Netlify CLI

```bash
# Установите Netlify CLI
npm install netlify-cli -g

# Авторизуйтесь
netlify login

# Создайте новый сайт
netlify init

# Деплойте
netlify deploy --prod
```

### 4. Настройка переменных окружения

#### В Netlify UI:

1. Откройте ваш сайт на Netlify
2. Перейдите в **Site settings** → **Build & deploy** → **Environment**
3. Нажмите **Edit variables**
4. Добавьте две переменные:
   ```
   TELEGRAM_BOT_TOKEN = (ваш токен от BotFather)
   TELEGRAM_CHAT_ID = (ваш Chat ID)
   ```
5. Сохраните (Deploy будет запущен автоматически)

**⚠️ Важно:** Не коммитьте реальные токены в GitHub! Используйте только переменные окружения Netlify.

### 5. Включение Email-уведомлений

1. На сайте Netlify откройте **Forms** (в левом меню)
2. Нажмите на форму **"contact"**
3. Откройте вкладку **"Notifications"**
4. Нажмите **"Email notification"**
5. Введите адрес **zmitro@mail.ru**
6. Сохраните

Теперь при каждой новой заявке будут приходить письма на zmitro@mail.ru.

## 📧 Email-уведомления (встроенные в Netlify)

При включении email-уведомлений Netlify автоматически отправляет письма со всеми данными формы на указанный адрес.

**Что включится:**
- Email при каждой новой заявке
- Все данные формы в письме
- Быстрый доступ к submissions в Netlify UI

## 💬 Telegram-уведомления (через Netlify Function)

### Как это работает:

1. Пользователь заполняет форму на сайте
2. JavaScript обрабатывает отправку и отправляет данные в Netlify Function
3. Функция `send-telegram.js` получает данные
4. Функция отправляет сообщение в Telegram через Bot API
5. Вы получаете красивое форматированное сообщение в приватный чат с ботом

### Формат Telegram-уведомления:

```
📝 Новая заявка с сайта

Имя: Иван Иванов
Email: ivan@example.com
Телефон: +7 999 123-45-67
Сообщение:
Подробное описание проекта...
```

### Обработка ошибок:

- Если любое из уведомлений (Telegram или Email) не отправится, заявка всё равно будет сохранена в Netlify Forms ✅
- Пользователь получит положительный ответ даже если Telegram был недоступен
- Все заявки можно просмотреть в Netlify Forms → submissions

## 📁 Структура проекта

```
my-first-project/
├── index.html                          # Основной файл с формой
├── netlify/
│   └── functions/
│       └── send-telegram.js            # Функция для отправки в Telegram
├── .env.example                        # Пример переменных окружения
├── netlify.toml                        # Конфигурация Netlify (если есть)
└── .gitignore                          # Исключаем .env из гита
```

## 🔒 Безопасность

### Что делается для безопасности:

1. **Токены не в коде** — все секреты хранятся в Netlify Environment Variables
2. **HTML-экранирование** — все данные экранируются перед отправкой в Telegram
3. **Проверка методов** — Netlify Function только принимает POST запросы
4. **Error handling** — ошибки логируются, но не отправляются пользователю

### Что НЕ нужно делать:

```javascript
// ❌ НЕПРАВИЛЬНО - никогда так не делайте!
const token = "123456789:ABCDEFGHIJKLMNoPqrsTuvWxYZ";

// ✅ ПРАВИЛЬНО - используйте переменные окружения
const token = process.env.TELEGRAM_BOT_TOKEN;
```

## 🧪 Тестирование

### Локально (перед деплоем):

```bash
# Установите зависимости
npm install

# Запустите функции локально
netlify functions:serve

# В otro терминале запустите сервер
netlify dev
```

### После деплоя:

1. Откройте ваш сайт
2. Прокрутите к форме
3. Заполните форму тестовыми данными
4. Нажмите "Отправить заявку"
5. Проверьте:
   - ✅ Вы видите сообщение "Спасибо! Ваша заявка отправлена"
   - ✅ Письмо пришло на zmitro@mail.ru
   - ✅ Сообщение в Telegram от вашего бота
   - ✅ Заявка видна в Netlify Forms → submissions

## 🐛 Troubleshooting

### Форма не отправляется

1. Откройте DevTools (F12)
2. Перейдите в консоль (Console)
3. Проверьте наличие ошибок красного цвета
4. Убедитесь что все поля заполнены (name, email, message обязательны)

### Telegram-уведомления не приходят

1. Проверьте переменные окружения в Netlify:
   - `Site settings` → `Build & deploy` → `Environment`
2. Убедитесь что:
   - `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` установлены
   - Вы написали боту хотя бы одно сообщение (нажмите "Start")
3. Откройте Netlify Function logs:
   - `Functions` → `send-telegram` → посмотрите логи последних вызовов
4. Проверьте формат Chat ID (должно быть число, не название)

### Email-уведомления не приходят

1. Зайдите в Netlify Forms → "contact" форма
2. Проверьте что Email notification включена
3. Убедитесь что zmitro@mail.ru - правильный адрес
4. Проверьте папку Spam/Junk
5. Если не помогает, отключите и включите уведомления заново

### "Чёрный экран" при отправке

- Это нормально, если функция отправляется асинхронно
- Пользователь должен увидеть зелёное сообщение об успехе
- Если этого не происходит, проверьте консоль (F12)

## 📚 Полезные ссылки

- [Документация Netlify Forms](https://docs.netlify.com/forms/overview/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather Help](https://core.telegram.org/bots#botfather)

## 🎯 Что дальше

После успешной настройки можно:

1. **Добавить CAPTCHA** (защита от ботов)
   - Используйте reCAPTCHA v3 или hCaptcha
   
2. **Улучшить формат Telegram**
   - Добавить кнопки быстрого ответа
   - Использовать inline клавиатуру

3. **Интегрировать CRM**
   - Отправлять данные в Zapier
   - Синхронизировать с Google Sheets

4. **Аналитика**
   - Отследить источник заявок
   - Понять, какие поля преобразуют лучше

---

**Вопросы?** Проверьте консоль браузера (F12 → Console) или логи Netlify functions!
