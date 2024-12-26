import { ChangeEvent, KeyboardEvent, useState } from "react"
import { StyledInput, StyledSpan } from "./EditableSpan.styled"

type EditableSpanProps = {
  value: string
  onChange: (newValue: string) => void
  disabled?: boolean
}

//todo: rewrite to react-hook-form
//Не теряет ли уневерсальность компонента от использования библиотек ????
export function EditableSpan(props: EditableSpanProps) {
  const { value, onChange, disabled } = props
  const [editableMode, setEditableMode] = useState<boolean>(false)
  const [inputItemText, setInputItemText] = useState(value)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputItemText(e.target.value)
  }

  const exitEditableMod = () => {
    if (inputItemText.trim().length !== 0) {
      onChange(inputItemText)
      setInputItemText(inputItemText.trim())
    }
    setEditableMode(false)
  }

  const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputItemText.trim().length !== 0) {
        onChange(inputItemText)
        setInputItemText(inputItemText.trim())
      }
      setEditableMode(false)
    }
  }

  const doubleClickHandler = () => {
    if (disabled === false) {
      setEditableMode(true)
    }
  }

  return editableMode ? (
    <StyledInput
      onChange={onChangeHandler}
      fullWidth
      variant="filled"
      size={"small"}
      onBlur={exitEditableMod}
      autoFocus={true}
      onKeyUp={addItemOnKeyUpHandler}
      value={inputItemText}
      disabled={disabled}
    />
  ) : (
    <StyledSpan onDoubleClick={doubleClickHandler}>{value}</StyledSpan>
  )
}
