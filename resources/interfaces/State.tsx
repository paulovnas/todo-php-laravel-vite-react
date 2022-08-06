import { ITask } from "./Models"

export interface ITaskState {
    taskWatch: {
        tasks: ITask[],
        tasksList: ITask[]
    }
}