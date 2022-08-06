import { Modal, Grid, Button, TextInput, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/rte";
import { ITask } from "../../interfaces/Models";
import { useTasks } from "../Tasks/Hook"

export const useModal = () => {
    const [opened, toggle] = useToggle([false, true]);
    const { onUpInsert } = useTasks();
    const form = useForm({
        initialValues: {
            id: 0,
            name: "",
            description: "",
            concluded: false,
        },

        validate: {
            name: (value) =>
                value.length >= 2 ? null : "Mínimo de 2 caracteres",
        },
    });

    const showModal = (task?: ITask) => {
        task && form.setValues(task);
        toggle();
    };

    const myModal = {
        opened: opened,
        toggle: showModal,
        modal: () => modal(),
    };

    const modal = () => {
        return (
            <Modal
                size="lg"
                opened={opened}
                onClose={() => toggle()}
                withCloseButton={false}
                closeOnClickOutside={false}
                title={<Title order={3}>{form.values.id ? "Editar Tarefa" : "Nova Tarefa"}</Title>}
            >
                <form
                    style={{ width: "100%" }}
                    onSubmit={form.onSubmit(() => onUpInsert({form, toggle}))}
                >
                    <TextInput
                        mb={14}
                        label="Nome"
                        placeholder="Nome da tarefa"
                        required
                        {...form.getInputProps("name")}
                    />

                    <RichTextEditor
                        style={{ minHeight: 200 }}
                        mb={20}
                        label="Descrição"
                        placeholder="Mais detalhes sobre a tarefa..."
                        description="Opcional"
                        {...form.getInputProps("description")}
                        controls={[
                            [
                                "bold",
                                "italic",
                                "underline",
                                "unorderedList",
                                "h1",
                                "h2",
                                "h3",
                                "alignLeft",
                                "alignCenter",
                                "alignRight",
                            ],
                        ]}
                    />
                    <Grid justify="space-between" align="center">
                        <Grid.Col span={5} xs={3}>
                            <Button
                                fullWidth
                                color="red"
                                onClick={() => {
                                    toggle();
                                    form.reset();
                                }}
                            >
                                Cancelar
                            </Button>
                        </Grid.Col>
                        <Grid.Col span={5} xs={3}>
                            <Button fullWidth type="submit" color="teal">
                                Salvar
                            </Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Modal>
        );
    };

    return myModal;
};
