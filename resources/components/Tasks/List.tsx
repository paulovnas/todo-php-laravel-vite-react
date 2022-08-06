import { Table, ActionIcon, Pagination, Menu, createStyles } from "@mantine/core";
import {
    IconArrowBack,
    IconCheck,
    IconPencil,
    IconSettings,
    IconTrash,
} from "@tabler/icons";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTasks } from "./Hook";
import { useModal } from "./Modal";

const useStyles = createStyles((theme) => ({
    occult: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    desc: {
        cursor: "pointer",
    },
    actions: {
        [theme.fn.smallerThan("sm")]: {
            maxWidth: "40%"
        },
        maxWidth: "16%"
    }
}));

const List = () => {
    const { classes } = useStyles();
    const { toggle, modal } = useModal();
    const {
        tasks,
        tasksList,
        pagination,
        onChangePage,
        onConcluded,
        onDelete,
    } = useTasks();

    useEffect(() => {
        onChangePage(1);
    }, [tasks]);

    const rows = () => {
        return tasksList.map((task, idx) => (
            <tr
                key={idx}
                style={
                    task.concluded
                        ? { color: "grey", textDecoration: "line-through" }
                        : {}
                }
            >
                <td className={classes.desc} onClick={() => toggle(task)}>
                    {" "}
                    {task.name.substring(0, 40)}{task.name.length > 40 && "..."}
                </td>
                <td className={classes.occult}>{dayjs(task.updated_at).fromNow()}</td>
                <td className={classes.actions}>
                    <Menu shadow="xs">
                        <Menu.Target>
                            <ActionIcon color="blue" size="sm" variant="light">
                                <IconSettings />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                color={task.concluded ? "orange" : "green"}
                                onClick={() => onConcluded(task)}
                                icon={
                                    task.concluded ? (
                                        <IconArrowBack size={14} />
                                    ) : (
                                        <IconCheck size={14} />
                                    )
                                }
                            >
                                {task.concluded ? "Restaurar" : "Concluir"}
                            </Menu.Item>
                            <Menu.Item
                                color="blue"
                                onClick={() => toggle(task)}
                                icon={<IconPencil size={14} />}
                            >
                                Editar
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                onClick={() => onDelete(task)}
                                icon={<IconTrash size={14} />}
                            >
                                Apagar
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <Table verticalSpacing="xs" striped highlightOnHover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className={classes.occult}>Alterado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows()}</tbody>
            </Table>
            {tasks.length > pagination.countShow ? (
                <Pagination
                    mt={10}
                    total={pagination.total(tasks.length)}
                    onChange={onChangePage}
                />
            ) : null}
            {modal()}
        </>
    );
};

export default List;
