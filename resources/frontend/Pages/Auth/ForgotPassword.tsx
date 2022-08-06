import { useState } from "react";
import Guest from "../../Layouts/Guest";
import { Head } from "@inertiajs/inertia-react";
import {
    Text,
    TextInput,
    Button,
    Group,
    Anchor,
    Center,
    Box,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { Inertia } from "@inertiajs/inertia";
import Toast from "../../../components/Toast";
import { AuthStyles } from "./Styles";

const ForgotPassword = ({ status }: { status: any }) => {
    const { classes } = AuthStyles();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            email: "",
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email inválido!",
        },
    });

    const submit = () => {
        setLoading(true);
        Inertia.post("/forgot-password", form.values, {
            onError: (a) => {
                Toast("error", a.message ? a.message : "Erro desconhecido!");
                setLoading(false);
            },
        });
    };

    return (
        <Guest
            title="Esqueceu a senha?"
            subtitle="Digite seu e-mail para receber um link de redefinição"
        >
            <>
                <Head title="Esqueceu a senha?" />

                <Text mb={20}>
                    Esquecer a senha é comum de acontecer. Basta nos informar
                    seu endereço de e-mail e enviaremos uma link que permitirá
                    que você escolha um novo.
                </Text>

                {status && Toast("info", status)}

                <form onSubmit={form.onSubmit(submit)}>
                    <TextInput
                        label="Seu Email"
                        placeholder="seu@email.com"
                        required
                        {...form.getInputProps("email")}
                    />

                    <Group
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
                                <Box ml={5}>Voltar</Box>
                            </Center>
                        </Anchor>
                        <Button
                            type="submit"
                            loading={loading}
                            className={classes.control}
                        >
                            Redefinir
                        </Button>
                    </Group>
                </form>
            </>
        </Guest>
    );
};

export default ForgotPassword;
