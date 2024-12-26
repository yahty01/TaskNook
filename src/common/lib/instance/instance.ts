import axios from "axios"
//Позволяет упаковать baseUrl и headers +много чего еще
export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
})

//Перехватывает запросы и позваляет до-конфигурировать его
//Преднознаен для ВСЕХ запросов! не получиться вычленить конкретный запрос таким образом
//Можно реализовать с помощью if else, но как правило так делаеют редко
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = "Bearer " + localStorage.getItem("sn-token")
  return config
})
