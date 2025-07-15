import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "../type";
import { v4 } from "uuid";

type TInitialState = {
    data: Todo[];
    editField: Todo | null;
}

const initialState: TInitialState = {
    data: [],
    editField: null,
}

const tableSlice = createSlice({
    name: "tableSlice",
    initialState,
    reducers: {
        add(state, { payload }: PayloadAction<Partial<Todo>>) {
            state.data.push({ ...(payload as Todo), id: v4() })
        },
        deleteItem(state, { payload }: PayloadAction<Todo>) {
            state.data = state.data.filter((item) => item.id !== payload.id);
        },
        setEditField(state, { payload }: PayloadAction<Todo | null>) {
            state.editField = payload;
        },
        save(state, { payload }: PayloadAction<Todo>) {
            state.data = state.data.map((item) => item.id === payload.id ? payload : item)
        }
    },
})

export const { add, deleteItem, setEditField, save } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;