// FilterButton.tsx
import React from 'react';
import Button from "@mui/material/Button";
import {ButtonProps} from "./Button";
import styled from '@emotion/styled';
import {theme} from "../App";

// Определите интерфейс для пропсов, включающий filter и остальные пропсы кнопки
interface FilterButtonProps extends ButtonProps {
	filter: 'all' | 'active' | 'completed';
}

// Создайте компонент FilterButton
const FilterButton = ({ filter, name, onClick }: FilterButtonProps) => {
	const isActive = name ? filter === name.toLowerCase() : false;
	return (
		<StyledButton isActive={isActive} onClick={onClick}>{name}</StyledButton>
	);
};

type StyledButtonProps = {
	isActive?: boolean
}

export const StyledButton = styled(Button)<StyledButtonProps>(({ isActive }) => ({
	background: isActive ? theme.palette.primary.light : '',
	'&:hover': {
		background: isActive ?theme.palette.primary.light : theme.palette.primary.main,
		color: theme.palette.primary.contrastText
	},
	color: theme.palette.secondary.contrastText,
}))

export default FilterButton;