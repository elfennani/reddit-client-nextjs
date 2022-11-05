import React, { useContext, useEffect } from "react";
import NotificationsAPI from "../contexts/NotificationsAPI";

export const useError = (message: string) => {
    const notificationsApi = useContext(NotificationsAPI);

    useEffect(() => {
        if (message) {
            notificationsApi.notify(message, "error", 10);
        }
    }, [message]);
};
