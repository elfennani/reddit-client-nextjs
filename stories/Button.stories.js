import Button from "../components/Button";

const config = {
    name: "Button",
    component: Button,
    argTypes: {
        onClick: { action: "onClickEvent" },
    },
};

export default config;

export const Idle = (args) => <Button {...args} />;

Idle.args = {
    title: "Click Me!",
};

export const Disabled = Idle.bind({});
Disabled.args = {
    title: "I'm Disabled :(",
    disabled: true,
};
