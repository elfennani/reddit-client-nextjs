import AccountTemplate from "../components/AccountTemplate";

const config = {
    name: "Account Card",
    component: AccountTemplate,
    argTypes: {
        onRefresh: { action: "Refresh" },
    },
};

export default config;

export const Idle = (args) => (
    // <div style={{ width: "300px", margin: "0 auto" }}>
    <AccountTemplate {...args} />
    // </div>
);

Idle.args = {
    isLoading: true,
};

export const Full = Idle.bind({});
Full.args = {
    profilePicture:
        "https://styles.redditmedia.com/t5_vjcux/styles/profileIcon_snoo4eb7f2fb-0e85-4c4d-8ec2-0ee989b23566-headshot-f.png?width=256&height=256&frame=1&crop=256:256,smart&s=ba057519c3932470fc6a56ba1ced07186fa40942",
    cover: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    fullname: "Nizar Elfennani",
    username: "u/elfennani",
    age: "3y 2mo",
    karma: 18000,
    isLoading: false,
};

export const Error = Idle.bind({});
Error.args = {
    errorMessage: "Failed to get user data",
};
