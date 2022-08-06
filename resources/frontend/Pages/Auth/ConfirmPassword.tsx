import { useState } from "react";
import {
    createStyles,
    Text,
    PasswordInput,
    Button,
    Group,
    Anchor,
    Center,
    Box,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Guest from "../../Layouts/Guest";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@mantine/form";
import Toast from "../../../components/Toast";
import { AuthStyles } from "./Styles";

const ConfirmPassword = () => {
    const { classes } = AuthStyles();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            password: "",
        },
    });

    const submit = () => {
        setLoading(true);
        Inertia.post("/confirm-password", form.values, {
            onError: (a) => {
                Toast("error", "Senha incorreta");
                setLoading(false);
            },
        });
    };

    return (
        <Guest title="Atenção" subtitle="Confirmação necessária">
            <>
                <Head title="Confirmar Senha" />

                <Text>
                    Esta é uma área segura do aplicativo. Confirme sua senha
                    antes de continuar.
                </Text>

                <form onSubmit={form.onSubmit(submit)}>
                    <PasswordInput
                        label="Senha"
                        placeholder="Digite sua senha"
                        required
                        mt="md"
                        {...form.getInputProps("password")}
                    />

                    <Group
                        mb={8}
                        position="apart"
                        mt="lg"
                        className={classes.controls}
                    >
                        <Anchor<"a">
                            href="/login"
                            color="dimmed"
                            size="sm"
                            className={classes.control}
                        >
                            <Center inline>
                                <IconArrowLeft size={12} stroke={1.5} />
                                <Box ml={5}>Cancelar</Box>
                            </Center>
                        </Anchor>
                        <Button
                            type="submit"
                            loading={loading}
                            className={classes.control}
                        >
                            Continuar
                        </Button>
                    </Group>
                </form>
            </>
        </Guest>
    );
};

export default ConfirmPassword;
