import { createStyles } from "@mantine/core";

const AuthStyles = createStyles((theme) => ({
    controls: {
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

export { AuthStyles };
