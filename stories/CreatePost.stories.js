import React from "react";

import CreatePost from "../components/CreatePost";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Create Post",
    component: CreatePost,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CreatePost {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    image: "https://styles.redditmedia.com/t5_vjcux/styles/profileIcon_snoo4eb7f2fb-0e85-4c4d-8ec2-0ee989b23566-headshot-f.png?width=256&height=256&frame=1&crop=256:256,smart&s=ba057519c3932470fc6a56ba1ced07186fa40942",
};
