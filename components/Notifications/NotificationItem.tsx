import React, { useContext, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import NotificationsAPI from "../../contexts/NotificationsAPI";
import { NotificationInfo } from "./NotificationProvider";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { NotificationFilled } from "@ant-design/icons";

type Props = {
    info: NotificationInfo;
    /**
     * Duration in seconds
     */
    duration?: number;
};

const ListItem = styled.li`
    list-style: none;
    padding: 16px;
    background: ${(p) => p.theme.cardBg};
    list-style: none;
    border-radius: 12px;
    border: 1px solid ${(p) => p.theme.border};
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    gap: 16px;
    align-items: center;
    animation: fade-in-left 0.3s forwards ease;

    @keyframes fade-in-left {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    &.remove {
        animation: fade-out 0.3s forwards ease !important;
    }
`;

const NotificationItem = ({ info, duration = 3 }: Props) => {
    const notificationsApi = useContext(NotificationsAPI);
    const theme = useTheme();

    useEffect(() => {
        const timeout = setTimeout(
            () => notificationsApi.remove(info.id),
            duration * 1000
        );

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <ListItem className={info.fadeout ? "remove" : ""}>
            <div>
                <NotificationFilled />
            </div>
            <div className="content">{info.content}</div>
            <div>
                <CountdownCircleTimer
                    isPlaying
                    duration={duration}
                    colors={[theme.text] as any}
                    strokeWidth={2}
                    trailColor={theme.text25 as any}
                    size={24}
                />
            </div>
        </ListItem>
    );
};

export default NotificationItem;
