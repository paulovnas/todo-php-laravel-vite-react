import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../interfaces/Models";

const initialState = {
    tasks: [] as ITask[],
    tasksList: [] as ITask[],
};

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        updateAllTasks: (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
        },
        updateAllTasksList: (state, action: PayloadAction<ITask[]>) => {
            state.tasksList = action.payload;
        },
    },
});

export const { updateAllTasks, updateAllTasksList } = taskSlice.actions;

export default taskSlice.reducer;
