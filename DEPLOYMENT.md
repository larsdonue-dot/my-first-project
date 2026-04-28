# 🧪 Локальное тестирование и доклоумент Deploy

## Локальное тестирование

### Вариант 1: Простой (без функций)

```bash
# Откройте index.html прямо в браузере
# Форма теоретически работает, но Netlify Functions не будут работать

# На Windows:
start index.html

# На Mac:
open index.html

# На Linux:
xdg-open index.html
```

**Ограничение:** Netlify Functions требуют серверной части, поэтому локально без `netlify dev` они не будут работать.

---

### Вариант 2: С Netlify CLI (рекомендуется)

#### Установка

```bash
# Если нет Node.js, скачайте с nodejs.org

# Установите Netlify CLI
npm install -g netlify-cli

# Проверьте что установилось
netlify --version
```

#### Запуск локально

```bash
# В папке проекта
cd my-first-project

# Авторизуйтесь в Netlify (откроется браузер)
netlify login

# Запустите локальный сервер с функциями
netlify dev

# Откроется http://localhost:8888
```

**Теперь функции работают локально!**

#### Тестирование формы локально

1. Откройте http://localhost:8888
2. Прокрутите к форме
3. Заполните поля (name, email, message обязательны)
4. Нажмите "Отправить заявку"
5. Посмотрите в консоль (F12 → Console):
   - Если ошибка красная → проверьте что введено
   - Если всё зелёное → ок

#### Как передать переменные окружения локально

1. Создайте файл `.env` в корне проекта (копия `.env.example`):

```
TELEGRAM_BOT_TOKEN=123456789:ABCDEFGHIJKLMnoPqrsTuvwxyz1234567
TELEGRAM_CHAT_ID=-987654321
```

2. Перезапустите `netlify dev`

3. Функция теперь будет иметь доступ к переменным

**⚠️ Важно:** файл `.env` в `.gitignore`, он не попадёт на GitHub

---

## 🚀 Production Deploy

### Вариант A: Через GitHub + Netlify (автоматический)

#### На GitHub

```bash
# Инициализируйте репо (если ещё не сделали)
git init
git add .
git commit -m "Initial commit: contact form with Netlify"
git remote add origin https://github.com/ВАШ_ЮЗЕР/ВАШ_РЕПО.git
git push -u origin main
```

#### На Netlify

```
1. Откройте https://netlify.com
2. Нажмите "Add new site"
3. Выберите "Import an existing project"
4. Нажмите "GitHub"
5. Авторизуйтесь и выберите репо
6. Netlify автоматически обнаружит netlify.toml
7. Нажмите "Deploy site"
```

**Готово! Сайт будет переделываться автоматически при каждом push в main**

---

### Вариант B: Через Netlify CLI (командная строка)

```bash
# В папке проекта
cd my-first-project

# Авторизуйтесь (если не авторизовались ещё)
netlify login

# Инициализируйте проект (если первый раз)
netlify init

# Выберите опцию при запросе:
# - Create & configure a new site
# - Team: Personal
# - Site name: (можете оставить пустым, Netlify создаст)

# Deploy на production
netlify deploy --prod

# Откроется ссылка на ваш сайт
```

---

## ⚙️ После Deploy: Финальная настройка

### 1. Добавить переменные окружения

```
Netlify → Site settings → Build & deploy → Environment

TELEGRAM_BOT_TOKEN = (ваш токен)
TELEGRAM_CHAT_ID = (ваш chat id)

Save → автоматический redeploy
```

### 2. Включить Email-уведомления

```
Netlify → Forms → contact (форма) → Notifications

Email notification → zmitro@mail.ru → Save
```

### 3. Проверить работу

```
1. Откройте ваш сайт
2. Заполните форму
3. Нажмите отправить
4. Проверьте:
   ✅ Зелёное сообщение на сайте
   ✅ Email на zmitro@mail.ru
   ✅ Сообщение в Telegram
   ✅ Заявка в Netlify Forms submissions
```

---

## 📊 Мониторинг после Deploy

### Просмотр заявок

```
Netlify → Forms → contact → Submissions
```

### Просмотр логов функций

```
Netlify → Functions → send-telegram → Logs
```

### Отладка ошибок

```
Netlify → Deploys → (последний deploy) → Deploy log
```

---

## 🔄 Обновления кода

После того как сайт на Netlify:

```bash
# Сделайте изменения локально
# ...

# Коммитьте в Git
git add .
git commit -m "Fix form styling"
git push origin main

# Netlify автоматически переделает сайт
# (обычно это занимает 1-2 минуты)
```

---

## 🐛 Troubleshooting

### Deploy не запускается

```
Проверьте:
1. netlify.toml существует в корне проекта
2. Нет синтаксических ошибок в файлах
3. GitHub репо синхронизирован
4. В Netlify выбран правильный бранч (main)
```

### Функция не работает

```
1. Проверьте переменные окружения (копировали ли?)
2. Перезапустите deploy (Netlify → Deploys → Trigger deploy)
3. Посмотрите логи функции (Functions → send-telegram → Logs)
4. Убедитесь формат данных правильный (JSON)
```

### Форма не отправляется

```
1. F12 → Console → посмотрите ошибки (красные)
2. Проверьте что все обязательные поля заполнены
3. В Netlify Forms проверьте что форма создалась
4. Перезагрузите страницу (Ctrl+F5)
```

---

## 📚 Дополнительно

- [Netlify CLI документация](https://docs.netlify.com/cli/get-started/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Netlify Forms](https://docs.netlify.com/forms/overview/)

**Готово к Deploy!** 🚀
