# Task Nook

Task Nook \- учебное SPA приложение на **React** и **TypeScript**. Здесь реализовано управление тудулистами и задачами с авторизацией пользователя.

## Возможности

- Регистрация и вход в систему с сохранением токена аутентификации.
- Создание, удаление и редактирование тудулистов и задач.
- Фильтрация задач (все/активные/завершённые) и пагинация списка задач.
- Переключение светлой и тёмной темы интерфейса.
- Обработка ошибок запросов к API и отображение сообщений пользователю.

## Архитектура

Код организован по feature\-подходу:

- **app** \- корневой модуль приложения. Здесь находится конфигурация `store`, базовый `App` компонент и обёртка над `redux-toolkit` API.
- **features** \- доменные части (авторизация, тудулисты). Каждый модуль содержит собственные `api`, `ui` и `model`.
- **common** \- переиспользуемые компоненты, хуки, утилиты и типы.

Хранилище настроено через `configureStore` и подключает `baseApi` для работы с сервером:

```ts
export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
   })
   ```

`baseApi` использует `fetchBaseQuery` и автоматически добавляет к каждому запросу API\-ключ и токен аутентификации из `localStorage`:

```ts
baseQuery: async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('API-KEY', import.meta.env.VITE_API_KEY || 'api-key-not-found')
      headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  })(args, api, extraOptions)

  handleError(api, result)
  return result
   }
   ```

Для приватных разделов используется `ProtectedRoute`, который перенаправляет неавторизованных пользователей на страницу входа:

```tsx
const ProtectedRoute = ({ isAuthenticated, path }: Props) => {
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(path, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? <Outlet /> : null
   }
   ```

## Технологии

- [React 18](https://react.dev/)  [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) \- быстрый сборщик и dev server
- [Redux Toolkit](https://redux-toolkit.js.org/) и RTK Query для управления состоянием и запросов к API
- [MUI](https://mui.com/) и `styled-components` для стилизации и темизации
- [react-hook-form](https://react-hook-form.com/) для работы с формами

## Быстрый старт

1. Установите зависимости:
   ```bash
   yarn install
   ```
2. Создайте файл `.env` и укажите адрес API и API\-KEY:
   ```env
   VITE_BASE_URL=http://example.com/api/
   VITE_API_KEY=your-key
   ```
3. Запустите dev сервер:
   ```bash
   yarn dev
   ```

После запуска приложение будет доступно по адресу `http://localhost:3000`.

## Почему этот проект может быть вам интересен

- Чистая структура каталогов и типизированный код делают проект лёгким для сопровождения.
- Использование современных инструментов (RTK Query, Vite, MUI) демонстрирует навыки работы с актуальным фронтенд-стеком.
- Приложение покрывает типичные задачи взаимодействия с REST API: авторизация, кэширование данных, оптимистичные обновления и обработка ошибок.

Буду рад обсудить детали реализации и дальнейшее развитие Task Nook!
