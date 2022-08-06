import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { Provider } from "react-redux";
import { Store } from "../state/Store";

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.importGlob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        return createRoot(el).render(
            <StrictMode>
                <Provider store={Store}>
                    <MantineProvider withGlobalStyles withNormalizeCSS>
                        <NotificationsProvider position="top-right">
                            <App {...props} />
                        </NotificationsProvider>
                    </MantineProvider>
                </Provider>
            </StrictMode>
        );
    },
});

InertiaProgress.init({ color: "#4B5563" });
