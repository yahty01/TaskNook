import styled from "styled-components";
import {ButtonHTMLAttributes} from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({name, onClick, className}: ButtonProps) {
	return (
		<StyledButton className={className} onClick={onClick}>{name}</StyledButton>
	);
}

const StyledButton = styled.button`
  padding: 5px 10px;
  background-color: rgba(123, 118, 118, 0.4);
  border-radius: 5px;

  &:hover {
    background-color: rgba(180, 13, 13, 0.45);
  }
`