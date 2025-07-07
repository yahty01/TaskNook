import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Fira Code", monospace;ы
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    line-height: 1.2;
  }

  html {
    height: 100%;
    background-attachment: fixed; /* Фиксация градиента */
    background-size: cover; /* Покрытие всей области */
    background-repeat: no-repeat;
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  body {
    margin: 0;
    min-height: 100vh; /* Убедитесь, что тело страницы всегда растянуто */
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat; /* Изображение не повторяется */
    background-size: contain; /* Масштабируем изображение так, чтобы оно полностью помещалось */
    background-position: center; /* Размещаем в центре элемента */
  }
  

  //#root {
  //  min-height: 100vh;
  //  display: flex;
  //  flex-direction: column;
  //}

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    background-color: unset;
    border: none;
  }
`
