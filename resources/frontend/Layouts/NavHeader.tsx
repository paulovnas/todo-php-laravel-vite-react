import { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
    Menu,
    UnstyledButton,
    Text,
    Title,
} from "@mantine/core";
import { IconChevronDown, IconUser, IconLogout } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { Inertia } from "@inertiajs/inertia";
import Toast from "../../components/Toast";
import { IAuth } from "../../interfaces/Route";

const useStyles = createStyles((theme) => ({
    inner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,

        [theme.fn.smallerThan("sm")]: {
            justifyContent: "flex-start",
        },
    },

    dropdown: {
        position: "absolute",
        top: 56,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    links: {
        width: 260,

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    social: {
        width: 260,

        [theme.fn.smallerThan("sm")]: {
            width: "auto",
            marginLeft: "auto",
        },
    },

    user: {
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: "background-color 100ms ease",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.white,
        },
    },

    userActive: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 2,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },
}));

interface HeaderResponsiveProps {
    links: { link: string; label: string }[];
    auth: IAuth;
}

const NavHeader = ({ links, auth }: HeaderResponsiveProps) => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
                close();
                Inertia.get(link.link);
            }}
        >
            {link.label}
        </a>
    ));
    return (
        <Header height={56} mb={120}>
            <Container className={classes.inner}>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                />

                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>

                <Text
                    size={24}
                    weight={700}
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                >
                    Lista de Tarefas
                </Text>

                <Group
                    spacing={0}
                    className={classes.social}
                    position="right"
                    noWrap
                >
                    <Menu
                        width={260}
                        position="bottom-end"
                        transition="pop-top-right"
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, {
                                    [classes.userActive]: userMenuOpened,
                                })}
                            >
                                <Group spacing={7}>
                                    <Text
                                        weight={500}
                                        size="sm"
                                        sx={{ lineHeight: 1 }}
                                        mr={3}
                                    >
                                        {auth.user.nickname}
                                    </Text>
                                    <IconChevronDown size={12} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                icon={<IconUser size={14} stroke={1.5} />}
                                onClick={() => Toast("info", "Em Manutenção")}
                            >
                                Meu Perfil
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                icon={<IconLogout size={14} stroke={1.5} />}
                                onClick={() => Inertia.post("/logout")}
                            >
                                Sair
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>

                <Transition
                    transition="pop-top-right"
                    duration={200}
                    mounted={opened}
                >
                    {(styles) => (
                        <Paper
                            className={classes.dropdown}
                            withBorder
                            style={styles}
                        >
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
};

export default NavHeader;
