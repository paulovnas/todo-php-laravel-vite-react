import {
    Box,
    Paper,
    Grid,
    Text,
    Button,
    SegmentedControl,
    Center,
    MantineColor,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import Authenticated from "../Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { IAuth } from "../../interfaces/Route";
import List from "../../components/Tasks/List";
import { ITask } from "../../interfaces/Models";
import { useModal } from "../../components/Tasks/Modal";
import { useEffect, useState } from "react";
import { filter } from "lodash";
import { useTasks } from "../../components/Tasks/Hook";
import Empty from "../../components/Tasks/Empty";

interface IProps {
    auth: IAuth;
    tasks: [ITask];
}

export default function Dashboard(props: IProps) {
    const { modal, toggle } = useModal();
    const { setTasks, tasks } = useTasks();
    const [concluded, setConcluded] = useState("false");
    const [segColor, setSegColor] = useState<MantineColor>("red");

    useEffect(() => {
        setTasks(filter(props.tasks, ["concluded", concluded === "true"]));
    }, [props.tasks]);

    const changeConcluded = (value: string) => {
        switch (value) {
            case "true":
                setSegColor("green");
                setTasks(filter(props.tasks, ["concluded", true]));
                break;
            case "false":
                setSegColor("red");
                setTasks(filter(props.tasks, ["concluded", false]));
                break;
        }
        setConcluded(value);
    };

    return (
        <Authenticated auth={props.auth}>
            <>
                <Head title="Dashboard" />
                {modal()}
                <Grid mb={20} justify="space-between" align="center">
                    <Grid.Col span={6}>
                        <Text size={20} color="blue" weight={700}>
                            Dashboard
                        </Text>
                    </Grid.Col>
                    <Grid.Col sm={3} md={2}>
                        <Button
                            leftIcon={<IconPlus />}
                            fullWidth
                            onClick={() => toggle()}
                        >
                            Nova Tarefa
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Center>
                            <SegmentedControl
                                value={concluded}
                                onChange={changeConcluded}
                                data={[
                                    { label: "Pendentes", value: "false" },
                                    {
                                        label: "Concluídos",
                                        value: "true",
                                        disabled: filter(props.tasks, [
                                            "concluded",
                                            true,
                                        ]).length
                                            ? false
                                            : true,
                                    },
                                ]}
                                color={segColor}
                            />
                        </Center>
                    </Grid.Col>
                </Grid>
                <Paper shadow="sm" radius="md" p="md">
                    <Box>{tasks.length > 0 ? <List /> : <Empty />}</Box>
                </Paper>
            </>
        </Authenticated>
    );
}
