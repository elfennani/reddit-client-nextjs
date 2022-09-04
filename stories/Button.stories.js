import Button from "../components/Button";

const config = {
    name: "Button",
    component: Button,
    argTypes: {
        onClick: { action: "onClickEvent" },
    },
};

export default config;

export const Primary = (args) => <Button {...args} />;

Primary.args = {
    title: "Click Me!",
};

export const Disabled = Primary.bind({});
Disabled.args = {
    title: "I'm Disabled :(",
    disabled: true,
};

export const Secondary = Primary.bind({});
Secondary.args = {
    title: "Secondary Button",
    secondary: true,
};
