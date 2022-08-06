import { showNotification } from "@mantine/notifications";
import { MantineColor } from "@mantine/styles";

type messageTypes = "success" | "warning" | "error" | "info";

const Toast = (type: messageTypes, message: string) => {
    let color: MantineColor = "blue";

    switch (type) {
        case "success":
            color = "green";
            break;
        case "warning":
            color = "orange";
            break;
        case "error":
            color = "red";
            break;
        default:
            break;
    }

    showNotification({
        message: message,
        color: color,
    });
};

export default Toast;
