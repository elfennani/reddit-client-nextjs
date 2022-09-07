import React from "react";
import PostView from "../components/PostView";

export default {
    title: "Post",
    component: PostView,
    argTypes: {
        onUpvote: { action: "onUpvote" },
        onDownvote: { action: "onDownvote" },
        onSave: { action: "onSave" },
        onShare: { action: "onShare" },
    },
};

const Template = (args) => <PostView {...args} />;

export const Default = Template.bind({});
Default.args = {
    subreddit: {
        name: "r/funny",
        picture:
            "https://styles.redditmedia.com/t5_2tex6/styles/communityIcon_u89jf60zv7p41.png",
        link: "https://www.reddit.com/r/funny/",
    },
    createdOn: 1660055529,
    creator: "u/elfennani",
    creatorLink: "https://www.reddit.com/user/elfennani",
    title: "Purpolch with a subtle purple cable from Mechcables.",
    // text: "",
    image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    votes: 420,
    commentCount: 69,
    extPostLink:
        "https://www.reddit.com/r/Frontend/comments/x7hgph/what_are_some_common_programming_tasks_for_front/?utm_source=share&utm_medium=web2x&context=3",
    type: "image",
};
