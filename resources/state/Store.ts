import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./TaskSlice";

export const Store = configureStore({
	reducer: {
		taskWatch: taskReducer,
	},
});