import styled, {css} from "styled-components";

type StyledSpanProps = {
	isDone: boolean;
}
export const SpanWrapper = styled.div<StyledSpanProps>`
  flex: 1 1 100%;
  opacity: ${props => (props.isDone ? '0.5' : '1')};
  position: relative;
  display: inline-block;
  max-width: fit-content;


  &::after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.palette.text.primary};
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }

  ${props => props.isDone && css`
    &::after {
      transform: scaleX(1);
    }
  `}
`;