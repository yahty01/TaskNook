import styled from 'styled-components';

export const StyledApp = styled.div<{ theme: any }>`
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
`;
