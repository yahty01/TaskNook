# 🚀 Миграция проекта с Create React App (CRA) на Vite

## 📦 Описание

Проект был изначально создан с использованием Create React App (CRA). В ходе миграции он был переведён на современный сборщик Vite для ускорения старта, билда и улучшения DX (developer experience).

---

## ✅ Шаги миграции

### 1. Инициализация контроля версий (если ещё не было)

```bash
git init
git add .
git commit -m "initial CRA version"
```

---

### 2. Удаление CRA-инфраструктуры (в PowerShell)

```powershell
# Удалить node_modules
Remove-Item -Recurse -Force node_modules

# Удалить папку public
Remove-Item -Recurse -Force public

# Удалить setupTests.ts (если есть)
Remove-Item -Force .\src\setupTests.ts

# Удалить файл .env (если был)
Remove-Item -Force .env
```

---

### 3. Удаление CRA-зависимостей

```bash
yarn remove react-scripts @testing-library/react @testing-library/jest-dom @testing-library/user-event web-vitals
```

---

### 4. Очистка `package.json`

Удалено:
- `scripts` от CRA: `start`, `build`, `test`, `eject`
- `eslintConfig`
- `jest`
- `browserslist`
- `react-scripts` из зависимостей

Добавлено:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "refactor": "yarn prettier . --write"
}
```

---

### 5. Установка и настройка Vite

```bash
yarn add -D vite @vitejs/plugin-react
```

Создан файл `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

### 6. Установка основных зависимостей проекта

(оставлены ранее установленные зависимости, такие как `react`, `react-dom`, `redux`, `@mui/material`, и т.д.)

---

### 7. Финальная проверка

- CRA полностью удалён
- `package.json` очищен от лишнего
- Переменные окружения переведены на `import.meta.env.VITE_`
- Команда `yarn dev` успешно запускает приложение

---

## 🧼 Дополнительно (опционально)

- Удалён `@types/jest`, если `jest` больше не используется:

```bash
yarn remove @types/jest
```

---

## 🏁 Статус: Миграция завершена ✅

Проект теперь использует Vite и готов к дальнейшему развитию.