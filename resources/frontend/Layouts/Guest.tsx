import { Paper, Container, Title, Text } from "@mantine/core";

interface IChildren {
    title: string;
    subtitle: JSX.Element | string;
    children: JSX.Element;
}

const Guest = ({ children, title, subtitle }: IChildren) => {
    const getSubTitle = () => {
        if (typeof subtitle === "string") {
            return (
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    {subtitle}
                </Text>
            );
        } else {
            return subtitle;
        }
    };

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                    fontSize: 26,
                })}
            >
                {title}
            </Title>
            {getSubTitle()}
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {children}
            </Paper>
        </Container>
    );
};

export default Guest;
