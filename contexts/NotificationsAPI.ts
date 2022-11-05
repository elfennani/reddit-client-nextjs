import { createContext } from "react";

export interface NotificationApiConfig {
    notify(content: string, color?: string, duration?: number): void;
    remove(id: number): void;
}

const config: NotificationApiConfig = {
    notify: () => {},
    remove: (id) => {},
};

export default createContext<NotificationApiConfig>(config);
