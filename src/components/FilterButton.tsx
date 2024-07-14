// FilterButton.tsx
import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from './Button';

// Определите интерфейс для пропсов, включающий filter и остальные пропсы кнопки
interface FilterButtonProps extends ButtonProps {
	filter: 'all' | 'active' | 'completed';
}

// Определите стилизованный компонент
const StyledButton = styled(Button)<{ isActive: boolean }>`
  background-color: ${props => props.isActive ? '#ffff' : 'grey'};
  justify-content: center;
`;

// Создайте компонент FilterButton
const FilterButton = ({ filter, name, ...rest }: FilterButtonProps) => {
	const isActive = name ? filter === name.toLowerCase() : false;
	return (
		<StyledButton name={name} isActive={isActive} {...rest} />
	);
};

export default FilterButton;