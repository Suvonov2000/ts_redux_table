import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type { Todo } from "../type";
import {v4} from "uuid";

type TInitialState = {
   data: Todo[];
}

const initialState: TInitialState = {
    data:[],
}

const tableSlice = createSlice({
    name:"tableSlice",
    initialState,
    reducers:{
       add(state,{payload}: PayloadAction<Partial<Todo>>){
        state.data.push({...(payload as Todo), id:v4()})
       },
       delete(state, {payload}: PayloadAction<Todo>) {
        state.data = state.data.filter((item)=>item.id !== payload.id);
       }
    },
})

export const {add} = tableSlice.actions;
export const tableReducer = tableSlice.reducer;