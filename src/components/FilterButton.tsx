// FilterButton.tsx
import React from 'react';
import styled from 'styled-components';
import Button from "@mui/material/Button";
import {ButtonProps} from "./Button";

// Определите интерфейс для пропсов, включающий filter и остальные пропсы кнопки
interface FilterButtonProps extends ButtonProps {
	filter: 'all' | 'active' | 'completed';
}

// Определите стилизованный компонент


// Создайте компонент FilterButton
const FilterButton = ({ filter, name, onClick }: FilterButtonProps) => {
	const isActive = name ? filter === name.toLowerCase() : false;
	return (
		<StyledButton name={name} isActive={isActive} onClick={onClick}>{name}</StyledButton>
	);
};

const StyledButton = styled(Button)<{ isActive: boolean }>`
	
  background-color: ${props => props.isActive ? '#ffff' : 'grey'};
`;
export default FilterButton;