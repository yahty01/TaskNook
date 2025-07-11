import React from "react"
import ReactDOM from "react-dom/client"
import { store } from "app/store"
import { Provider } from "react-redux"
import { HashRouter } from "react-router"
import { App } from "app/App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    {/* Обернкть до провайдера или после ? Ответ: Не важно, и так и так будет работать */}
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
