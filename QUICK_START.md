# ⚡ Быстрый старт — Контактная форма

## За 5 минут настроить форму с Telegram уведомлениями

### 1️⃣ Получить Telegram бот-токен (2 мин)

```
1. Откройте Telegram → найдите @BotFather
2. Отправьте /newbot
3. Следуйте инструкциям, скопируйте токен
4. Пример токена: 123456789:ABCDEFGHIJKLMnoPqrsTuvwxyz1234567
```

**Подробнее:** см. [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md)

---

### 2️⃣ Получить Chat ID (1 мин)

```
1. Откройте своего бота в Telegram → нажмите Start
2. Отправьте боту сообщение: "test"
3. Откройте в браузере:
   https://api.telegram.org/botТОКЕН/getUpdates
4. Найдите "id" в ответе — это Chat ID
5. Пример: -987654321
```

**Подробнее:** см. [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md)

---

### 3️⃣ Загрузить на GitHub (1 мин)

```bash
git add .
git commit -m "Add contact form with Netlify Forms"
git push
```

---

### 4️⃣ Развернуть на Netlify (1 мин)

```
1. Откройте netlify.com
2. Нажмите "Add new site" → "Import an existing project"
3. Выберите GitHub репозиторий
4. Нажмите "Deploy"
```

---

### 5️⃣ Добавить переменные окружения (0 мин)

```
1. На Netlify откройте Site settings
2. Build & deploy → Environment
3. Нажимите Edit variables
4. Добавьте:
   TELEGRAM_BOT_TOKEN = (ваш токен)
   TELEGRAM_CHAT_ID = (ваш chat id)
5. Save → автоматический redeploy
```

---

### 6️⃣ Включить Email-уведомления (0 мин)

```
1. На Netlify откройте Forms
2. Нажмите на форму "contact"
3. Notifications → Email notification
4. Введите zmitro@mail.ru
5. Save
```

---

## ✅ Готово!

Теперь когда пользователь заполнит форму:
- ✅ Заявка сохранится в Netlify Forms
- ✅ Письмо придёт на zmitro@mail.ru
- ✅ Сообщение придёт в Telegram
- ✅ Пользователь увидит "Спасибо!"

---

## 🧪 Протестировать

1. Откройте ваш сайт
2. Заполните форму
3. Нажмите отправить
4. Проверьте:
   - Зелёное сообщение "Спасибо!"
   - Email на zmitro@mail.ru
   - Сообщение в Telegram
   - Заявка в Netlify Forms → submissions

---

## ❓ Вопросы

- Как получить Chat ID? → [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md)
- Полная документация? → [FORM_SETUP.md](FORM_SETUP.md)
- Как локально тестировать? → см. FORM_SETUP.md → Тестирование

---

## 📁 Что изменилось в проекте

```
✅ index.html              — форма с netlify атрибутами
✅ netlify/functions/send-telegram.js  — функция для Telegram
✅ netlify.toml            — конфиг Netlify
✅ .env.example            — пример переменных
✅ .gitignore              — защита от утечки токенов
```

**Готово к деплою!** 🚀
