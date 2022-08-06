import {
    TextInput,
    PasswordInput,
    Anchor,
    Text,
    Group,
    Checkbox,
    Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import Toast from "../../../components/Toast";
import { useState } from "react";
import Guest from "../../Layouts/Guest";

interface ILogin {
    status: any;
    canResetPassword: boolean;
}

const Login = ({ status, canResetPassword }: ILogin) => {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email inválido!",
        },
    });

    const submit = () => {
        setLoading(true);
        Inertia.post("/login", form.values, {
            onError: (a) => {
                Toast("error", a.message);
                setLoading(false);
            },
        });
    };

    const sub = () => {
        return (
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Ainda não tem uma conta?{" "}
                <Anchor<"a"> href="/register" size="sm">
                    Criar conta
                </Anchor>
            </Text>
        );
    };

    return (
        <Guest title="Seja Bem vindo(a)!" subtitle={sub()}>
            <>
                <Head title="Entrar" />
                {status && Toast("info", status)}

                <form onSubmit={form.onSubmit(submit)}>
                    <TextInput
                        required
                        label="Email"
                        placeholder="seu@email.com"
                        {...form.getInputProps("email")}
                    />

                    <PasswordInput
                        label="Senha"
                        placeholder="Digite sua senha"
                        required
                        mt="md"
                        {...form.getInputProps("password")}
                    />

                    <Group position="apart" mt="md">
                        <Checkbox
                            label="Lembrar-me"
                            {...form.getInputProps("remember", {
                                type: "checkbox",
                            })}
                        />
                        {canResetPassword && (
                            <Anchor<"a"> href="/forgot-password" size="sm">
                                Esqueceu sua senha?
                            </Anchor>
                        )}
                    </Group>

                    <Button loading={loading} type="submit" fullWidth mt="xl">
                        Entrar
                    </Button>
                </form>
            </>
        </Guest>
    );
};

export default Login;
