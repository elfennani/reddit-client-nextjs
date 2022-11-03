import React, { useRef, useState } from "react";
import styled from "styled-components";
import NotificationsAPI, {
    NotificationApiConfig,
} from "../../contexts/NotificationsAPI";
import NotificationItem from "./NotificationItem";

type Props = {
    children: any;
};

export type NotificationInfo = {
    id: number;
    content: string;
    color?: string;
    fadeout: boolean;
};

const NotificationContainer = styled.ul`
    position: fixed;
    bottom: 16px;
    right: 32px;
    display: flex;
    gap: 16px;
    flex-direction: column;
    width: 400px;
`;

const NotificationProvider = (props: Props) => {
    const currentId = useRef(0);
    const [notifications, setNotifications] = useState<NotificationInfo[]>([]);

    const notify = (content: string, color?: string) => {
        console.log("first");
        setNotifications((notifications) => {
            currentId.current++;
            return [
                ...notifications,
                {
                    id: currentId.current - 1,
                    content,
                    color,
                    fadeout: false,
                },
            ];
        });
    };

    const remove = (id: number, withAnimation = true) => {
        if (withAnimation) {
            setNotifications((notifications) =>
                notifications.map((n) =>
                    n.id == id ? { ...n, fadeout: true } : n
                )
            );
            setTimeout(() => {
                remove(id, false);
            }, 300);
            return;
        }

        setNotifications((notifications) =>
            notifications.filter((notif) => notif.id != id)
        );
    };

    const config: NotificationApiConfig = {
        notify,
        remove,
    };

    return (
        <NotificationsAPI.Provider value={config}>
            {props.children}
            <NotificationContainer>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        info={notification}
                    />
                ))}
            </NotificationContainer>
        </NotificationsAPI.Provider>
    );
};

export default NotificationProvider;
