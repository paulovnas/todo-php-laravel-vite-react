import { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import Guest from "../../Layouts/Guest";
import { Head } from "@inertiajs/inertia-react";
import { useForm } from "@mantine/form";
import { Inertia } from "@inertiajs/inertia";
import Toast from "../../../components/Toast";

interface IReset {
    token: string;
    email: string;
}

const ResetPassword = ({ token, email }: IReset) => {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            token: token,
            email: email,
            password: "",
            password_confirmation: "",
        },

        validate: {
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
        Inertia.post("/reset-password", form.values, {
            onError: (a) => {
                Toast("error", a.message ? a.message : JSON.stringify(a));
                setLoading(false);
            },
        });
    };

    return (
        <Guest title="Redefinir Senha" subtitle="Atenção aos detalhes!">
            <>
                <Head title="Redefinir Senha" />

                <form onSubmit={form.onSubmit(submit)}>
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
                        placeholder="Digite sua nova senha"
                        required
                        {...form.getInputProps("password")}
                    />

                    <PasswordInput
                        mb={8}
                        label="Confirmar Senha"
                        placeholder="Por garantia ;)"
                        required
                        {...form.getInputProps("password_confirmation")}
                    />

                    <Button loading={loading} type="submit" fullWidth mt="xl">
                        Redefinir
                    </Button>
                </form>
            </>
        </Guest>
    );
};
