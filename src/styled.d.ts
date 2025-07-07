import "styled-components"
// Импорт типа Theme из Material-UI, который содержит все определения тем MUI
import { Theme } from "@mui/material/styles" // Объявление модуля для расширения стандартных типов styled-components

// Объявление модуля для расширения стандартных типов styled-components
declare module "styled-components" {
  // Переопределение интерфейса DefaultTheme
  export interface DefaultTheme extends Theme {}
  /*
   * Что это делает:
   * 1. Берет стандартный DefaultTheme из styled-components
   * 2. Расширяет его всеми типами из MUI Theme
   * 3. Теперь все компоненты, использующие theme prop, будут знать о:
   *    - palette (включая background, text и т.д.)
   *    - typography
   *    - spacing
   *    - и всех других свойствах MUI темы
   *
   * Почему это важно:
   * - styled-components по умолчанию не знает о структуре MUI темы
   * - Это объявление соединяет систему типов MUI и styled-components
   * - Позволяет использовать theme.palette.* без ошибок TypeScript
   */
}
