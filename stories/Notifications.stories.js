import NotificationCard from "../components/NotificationCard";
import NotificationItem from "../components/NotificationItem";

const config = {
    name: "Notification Card",
    component: NotificationCard,
    argTypes: {
        onRefresh: { action: "Refresh Notifications" },
        onShowAll: { action: "Show All Notifications" },
    },
};

export default config;

export const Empty = (args) => <NotificationCard {...args}></NotificationCard>;

export const Filled = (args) => (
    <NotificationCard {...args}>
        <NotificationItem
            title="u/aperson_1234 replied to your comments on r/funny"
            text="30min ago"
            image="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
        />
        <NotificationItem
            title="u/another0ne gave your comment an award."
            text="1h ago"
            image="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
        />
    </NotificationCard>
);

export const Error = Empty.bind({});

Error.args = {
    errorMessage: "Failed to fetch notifications",
};

export const NoRefresh = Empty.bind({});

NoRefresh.args = {
    onRefresh: null,
};
