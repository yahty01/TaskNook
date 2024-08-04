import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type AddItemFormProps = {
	addItem: (title: string) => void
	theme: any
}

export function AddItemForm({addItem, theme}: AddItemFormProps) {
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
		<Box sx={{margin:'15px 0'}} display={'flex'}>
			<TextField
			label="Enter a title"
			variant={'outlined'}
			value={inputItemText}
			size={'small'}
			error={!!error}
			helperText={error}
			onChange={onTitleChangeHandler}
			onKeyUp={addItemOnKeyUpHandler}
		/>
				<Button onClick={addItemHandler} aria-label="Add" variant={'contained'} sx={{marginLeft: '8px' ,backgroundColor: theme.palette.primary.main}}>
				<AddIcon/>
				</Button>
		</Box>)

}