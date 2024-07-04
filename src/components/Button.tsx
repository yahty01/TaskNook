import styled from "styled-components";

//Переписать на
type ButtonProps = {
	name?: string;
	callBack: () => void;
	className?: string;
};

export const Button = ({name, callBack, className}: ButtonProps) => {

	const onClickHandler = () => {
		callBack();
	}

	return (
		<StyledButton className={className} onClick={onClickHandler}>{name}</StyledButton>
	);
};
const StyledButton = styled.button`
  padding: 5px 10px;
  background-color: rgba(123, 118, 118, 0.4);
  border-radius: 5px;

  &:hover {
    background-color: rgba(123, 118, 118, 0.85);;
  }
`