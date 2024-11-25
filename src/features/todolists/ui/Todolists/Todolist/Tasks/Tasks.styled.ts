import styled from "styled-components"

export const CircularContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px; /* Минимальная высота, чтобы крутилка не выглядела сжатой */
`

export const Container = styled.div`
  height: 250px; /* Максимальная высота контейнера */
  overflow-y: auto; /* Добавляет прокрутку при превышении высоты */
  transition: max-height 0.3s ease; /* Плавный переход высоты */
`
