import React, { SyntheticEvent, useState } from "react"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import AllOutIcon from "@mui/icons-material/AllOut"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { changeTodolistFilterAC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

export type FilterType = "all" | "active" | "completed"

interface FilterButtonProps {
  id: string
  filter: FilterType
}

export function FilterTasksButtons({ filter, id }: FilterButtonProps) {
  const [value, setValue] = useState<FilterType>(filter)

  const dispatch = useAppDispatch()

  const handleChange = (event: SyntheticEvent, newValue: FilterType) => {
    dispatch(changeTodolistFilterAC({ todolistId: id, filter: newValue }))
    setValue(newValue)
  }

  return (
    <BottomNavigation sx={{ width: 340, borderRadius: 10 }} value={value} onChange={handleChange}>
      <BottomNavigationAction label="All" value="all" icon={<AllOutIcon />} />
      <BottomNavigationAction label="Active" value="active" icon={<CheckBoxOutlineBlankIcon />} />
      <BottomNavigationAction label="Completed" value="completed" icon={<CheckBoxIcon />} />
    </BottomNavigation>
  )
}
