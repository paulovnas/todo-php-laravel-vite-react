import { AppShell, Container, Footer, useMantineTheme } from "@mantine/core";
import { IAuth } from "../../interfaces/Route";
import NavHeader from "./NavHeader";

interface IAuthenticated {
    auth: IAuth;
    children: JSX.Element;
}

const links = [
    {
        label: "Dashboard",
        link: "/",
    },
];

const Authenticated = ({ auth, children }: IAuthenticated) => {
    const theme = useMantineTheme();
    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            header={<NavHeader auth={auth} links={links} />}
            footer={
                <Footer style={{ textAlign: "center" }} height={60} p="md">
                    Construído com ♥ por Paulo Vitor Nascimento
                </Footer>
            }
        >
            <Container my="md">{children}</Container>
        </AppShell>
    );
};

export default Authenticated;
