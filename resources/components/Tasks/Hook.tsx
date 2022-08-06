import { Inertia } from "@inertiajs/inertia";
import { UseFormReturnType } from "@mantine/form";
import { useSetState } from "@mantine/hooks";
import { cloneDeep, slice } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { ITask } from "../../interfaces/Models";
import { ITaskState } from "../../interfaces/State";
import { updateAllTasks, updateAllTasksList } from "../../state/TaskSlice";
import Toast from "../Toast";

interface IUpInsert {
    form: UseFormReturnType<{
        id: number;
        name: string;
        description: string;
        concluded: boolean;
    }>;
    toggle: (value?: React.SetStateAction<boolean> | undefined) => void;
}

interface IPagination {
    countShow: number;
    page: number;
    total(countTasks: number): number;
}

export const useTasks = () => {
    const dispatch = useDispatch();

    //Tarefas
    const tasks = useSelector((state: ITaskState) => state.taskWatch.tasks);
    const tasksList = useSelector(
        (state: ITaskState) => state.taskWatch.tasksList
    );

    const onUpInsert = ({ form, toggle }: IUpInsert) => {
        Inertia.post("/task/upinsert", form.values, {
            onSuccess: (a) => {
                Toast("success", "Tarefa salva com sucesso!");
                form.reset();
            },
            onError: (a) => {
                Toast("error", a.message ? a.message : JSON.stringify(a));
            },
            onFinish: () => {
                toggle();
            },
        });
    };

    const onConcluded = (task: ITask) => {
        let newTask = cloneDeep(task);
        newTask.concluded = !newTask.concluded;
        Inertia.post("/task/upinsert", newTask as any, {
            onSuccess: (a) => {
                Toast(
                    "success",
                    `Tarefa ${
                        newTask.concluded ? "concluída" : "restaurada"
                    } com sucesso!`
                );
            },
            onError: (a) => {
                Toast("error", a.message ? a.message : JSON.stringify(a));
            },
        });
    };

    const onDelete = (task: ITask) => {
        Inertia.post("/task/delete", task as any, {
            onSuccess: (a) => {
                Toast("success", "Tarefa apagada com sucesso!");
            },
            onError: (a) => {
                Toast("error", a.message ? a.message : JSON.stringify(a));
            },
        });
    };

    //Paginação
    const [pagination, setPagination] = useSetState<IPagination>({
        countShow: 8,
        page: 1,
        total: function (this: IPagination, countTasks: number) {
            return Math.ceil(countTasks / this.countShow);
        },
    });

    const onChangePage = (page: number) => {
        const nextIdx = page * pagination.countShow;
        setPagination({ page });
        dispatch(
            updateAllTasksList(
                slice(tasks, nextIdx - pagination.countShow, nextIdx)
            )
        );
    };

    const myTasks = {
        tasks,
        tasksList,
        setTasks: (tasks: ITask[]) => dispatch(updateAllTasks(tasks)),
        onUpInsert,
        onConcluded,
        onDelete,
        pagination,
        setPagination,
        onChangePage,
    };

    return myTasks;
};
