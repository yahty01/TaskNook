import * as React from 'react';
import styled from "styled-components";

type ButtonProps = {
	title: string;
};
export const Button = ({title}: ButtonProps) => {
	return (
		<StyledButton>{title}</StyledButton>
	);
};

export const StyledButton = styled.button`
  padding: 5px 10px;
  background-color: rgba(123, 118, 118, 0.4);
  border-radius: 5px;

  &:hover {
    background-color: rgba(123, 118, 118, 0.85);;
  }
`