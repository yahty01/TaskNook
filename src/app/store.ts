import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/reducer/tasks-reducer";
import {todolistsReducer} from "../features/reducer/todolists-reducer";
import {appReducer} from "./app-reducer";

export const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
})

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store