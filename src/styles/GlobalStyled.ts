import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    //Запись p0+m0 + TAB    
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Fira Code", monospace;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
	  line-height: 1.2;
  }

  body {
    background-color: rgba(47, 107, 97, 0.33);
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    & > div > div {
      display: flex;
      gap: 10px;
    }
  }

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