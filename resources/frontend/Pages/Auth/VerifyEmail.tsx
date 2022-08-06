import { useState } from "react";
import { Text, Button, Group, Anchor, Center, Box } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Guest from "../../Layouts/Guest";
import { Head } from "@inertiajs/inertia-react";
import { useForm } from "@mantine/form";
import { Inertia } from "@inertiajs/inertia";
import Toast from "../../../components/Toast";
import { AuthStyles } from "./Styles";

const VerifyEmail = ({ status }: { status: any }) => {
    const { classes } = AuthStyles();
    const [loading, setLoading] = useState(false);
    const form = useForm();

    const submit = () => {
        setLoading(true);
        Inertia.post("/email/verification-notification", undefined, {
            onError: (a) => {
                Toast("error", a.message ? a.message : JSON.stringify(a));
                setLoading(false);
            },
        });
    };

    return (
        <Guest title="Verificação de email" subtitle="Confirmação necessária">
            <>
                <Head title="Verificação de Email" />

                <Text>
                    Obrigado por inscrever-se! Antes de começar, você pode
                    verificar seu endereço de e-mail clicando no link que
                    acabamos de enviar para você? Se você não recebeu o e-mail,
                    teremos o prazer de lhe enviar outro.
                </Text>

                {status === "verification-link-sent" &&
                    Toast(
                        "success",
                        "Um novo link de verificação foi enviado para o endereço de e-mail fornecido durante o registro."
                    )}

                <form onSubmit={form.onSubmit(submit)}>
                    <Group
                        mb={8}
                        position="apart"
                        mt="lg"
                        className={classes.controls}
                    >
                        <Anchor<"a">
                            href={undefined}
                            onClick={() => Inertia.post("/logout")}
                            color="dimmed"
                            size="sm"
                            className={classes.control}
                        >
                            <Center inline>
                                <IconArrowLeft size={12} stroke={1.5} />
                                <Box ml={5}>Sair</Box>
                            </Center>
                        </Anchor>
                        <Button
                            type="submit"
                            loading={loading}
                            className={classes.control}
                        >
                            Enviar email de verificação
                        </Button>
                    </Group>
                </form>
            </>
        </Guest>
    );
};

export default VerifyEmail;
