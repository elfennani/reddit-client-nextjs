import React from "react";
import PostView from "../components/PostView";

export default {
    title: "Post",
    component: PostView,
    argTypes: {},
};

const Template = (args) => <PostView {...args} />;

export const Default = Template.bind({});
Default.args = {
    subreddit: {
        name: "u/funny",
        picture:
            "https://styles.redditmedia.com/t5_2tex6/styles/communityIcon_u89jf60zv7p41.png",
    },
};
