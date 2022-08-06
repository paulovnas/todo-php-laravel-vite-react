import { useState } from "react";
import {
    TextInput,
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
import { useForm } from "@mantine/form";
import { Inertia } from "@inertiajs/inertia";
import Toast from "../../../components/Toast";
import { AuthStyles } from "./Styles";

const Register = () => {
    const { classes } = AuthStyles();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            name: "",
            nickname: "",
            email: "",
            password: "",
            password_confirmation: "",
        },

        validate: {
            name: (value) =>
                value.length >= 5 ? null : "Mínimo de 5 caracteres",
            nickname: (value) =>
                value.length >= 2 ? null : "Mínimo de 2 caracteres",
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email inválido",
            password: (value) =>
                value.length >= 4 ? null : "Mínimo de 4 caracteres",
            password_confirmation: (value, values) =>
                value === values.password ? null : "Senhas não coincidem",
        },
    });

    const submit = () => {
        setLoading(true);
        Inertia.post("/register", form.values, {
            onError: (a) => {
                Toast("error", a.message ? a.message : JSON.stringify(a));
                setLoading(false);
            },
        });
    };

    return (
        <Guest title="Registrar-se" subtitle="Registre-se para continuar">
            <>
                <Head title="Registrar-se" />

                <form onSubmit={form.onSubmit(submit)}>
                    <TextInput
                        mb={8}
                        label="Nome Completo"
                        placeholder="Seu lindo nome aqui"
                        required
                        {...form.getInputProps("name")}
                    />

                    <TextInput
                        mb={8}
                        label="Apelido"
                        placeholder="Como devemos te chamar?"
                        required
                        {...form.getInputProps("nickname")}
                    />

                    <TextInput
                        mb={8}
                        label="Email"
                        placeholder="seu@email.com"
                        required
                        {...form.getInputProps("email")}
                    />

                    <PasswordInput
                        mb={8}
                        label="Senha"
                        placeholder="Digite uma senha"
                        required
                        {...form.getInputProps("password")}
                    />

                    <PasswordInput
                        mb={8}
                        label="Confirmar Senha"
                        placeholder="Só por garantia ;)"
                        required
                        {...form.getInputProps("password_confirmation")}
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
                                <Box ml={5}>Ja sou registrado...</Box>
                            </Center>
                        </Anchor>
                        <Button
                            type="submit"
                            loading={loading}
                            className={classes.control}
                        >
                            Registrar
                        </Button>
                    </Group>
                </form>
            </>
        </Guest>
    );
};

export default Register;
