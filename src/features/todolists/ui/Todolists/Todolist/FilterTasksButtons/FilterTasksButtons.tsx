import React, { SyntheticEvent, useState } from "react"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import AllOutIcon from "@mui/icons-material/AllOut"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { todolistsApi } from "../../../../api/todolistsApi"
import { useAppDispatch } from "common/hooks"

export type FilterType = "all" | "active" | "completed"

type Props = {
  id: string
  filter: FilterType
}

export function FilterTasksButtons({ filter, id }: Props) {
  const [value, setValue] = useState<FilterType>(filter)

  const dispatch = useAppDispatch()

  const handleChange = (_: SyntheticEvent, newValue: FilterType) => {
    // dispatch(updateTodolistFilter({ todolistId: id, filter: newValue }))
    dispatch(
      todolistsApi.util.updateQueryData(
        // название эндпоинта, в котором нужно обновить кэш
        "getTodolists",
        // аргументы для эндпоинта
        undefined,
        // `updateRecipe` - коллбэк для обновления закэшированного стейта мутабельным образом
        (draft) => {
          const todolist = draft.find((tl) => tl.id === id)
          if (todolist) {
            todolist.filter = newValue
          }
        },
      ),
    )
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
