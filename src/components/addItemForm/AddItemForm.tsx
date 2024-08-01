import {Button} from "../Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styled from "styled-components";

type AddItemFormProps = {
	addItem: (title: string) => void
}

export function AddItemForm({addItem}: AddItemFormProps) {
	const [inputItemText, setInputItemText] = useState('');
	const [error, setError] = useState<string | null>(null)

	const isEmptyInput = inputItemText.trim() === '';

	const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setInputItemText(e.currentTarget.value);
	};

	const addItemHandler = () => {
		isEmptyInput ? setError('Поле не может быть пустым') : addItem(inputItemText.trim());
		setInputItemText('');
	};

	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addItemHandler();
		}
	};


	return (
		<>
			<StyledInputArea error={error}>
				<input onChange={onTitleChangeHandler} onKeyDown={addItemOnKeyUpHandler} value={inputItemText}/>
				<Button onClick={addItemHandler} name={'+'}/>
			</StyledInputArea>
			{error && <Error>{error}</Error>}
		</>)

}

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
`;

const StyledInputArea = styled.div<{ error: string | null }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  outline: 2px dotted black;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: rgba(34, 139, 34, 0.32);

  input {
    border-radius: 5px;
    border: ${props => (props.error ? '4px solid red' : '1px solid #ccc')};
    padding: 10px;
    margin-bottom: 5px;
  }
`;