import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "common/constants"
import { handleError } from "common/utils"

export const baseApi = createApi({
  reducerPath: "baseTodolistApi",
  tagTypes: ["Todolist", "Task"],
  // Сохраняет кэшированные данные в течение 5 секунд после того, как компонент отписался
  keepUnusedDataFor: 14400, // 4 hours
  // // Автоматически перезапрашивает данные при возврате фокуса на окно (например, после переключения вкладки)
  // refetchOnFocus: false,
  // // Автоматически перезапрашивает данные при восстановлении соединения с интернетом
  // refetchOnReconnect: false,
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", import.meta.env.VITE_API_KEY || "api-key-not-found")
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
})
//_____________________________прошлая версия, без кстомного baseQuery__________________________________________________
// export const baseApi = createApi({
//   reducerPath: "baseTodolistApi",
//   tagTypes: ["Todolist", "Task"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BASE_URL,
//     prepareHeaders: (headers) => {
//       headers.set("API-KEY", process.env.REACT_APP_API_KEY || "api-key-not-found")
//       headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
//     },
//   }),
//   endpoints: () => ({}),
// })
