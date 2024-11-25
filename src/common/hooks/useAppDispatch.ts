import { useDispatch } from "react-redux"
import { x } from "app/store"

export const useAppDispatch = useDispatch.withTypes<x>()
