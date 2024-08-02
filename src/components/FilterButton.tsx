// FilterButton.tsx
import React, {SyntheticEvent, useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AllOutIcon from '@mui/icons-material/AllOut';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Определите интерфейс для пропсов, включающий filter и остальные пропсы кнопки
type FilterType = 'all' | 'active' | 'completed'

interface FilterButtonProps {
	filter: FilterType;
	onClick: (filter: FilterType) => void
}

// Создайте компонент FilterButton
const FilterButton = ({filter, onClick}: FilterButtonProps) => {
	const [value, setValue] = useState<FilterType>(filter);

	const handleChange = (event: SyntheticEvent, newValue: FilterType) => {
		onClick(newValue)
		setValue(newValue);
	};

	return (
		<BottomNavigation sx={{width:340 , borderRadius: 10}} value={value} onChange={handleChange}>
			<BottomNavigationAction
				label="All"
				value="all"
				icon={<AllOutIcon/>}
			/>
			<BottomNavigationAction
				label="Active"
				value="active"
				icon={<CheckBoxOutlineBlankIcon/>}
			/>
			<BottomNavigationAction
				label="Completed"
				value="completed"
				icon={<CheckBoxIcon/>}
			/>
		</BottomNavigation>

	);
};

export default FilterButton;