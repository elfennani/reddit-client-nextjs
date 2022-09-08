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
// https://api.npoint.io/4fda702f3cfad9a1c766
const Template = (args) => <PostView {...args} />;

export const Image = Template.bind({});
Image.args = {
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
    voteState: "none",
    postLink:
        "https://www.reddit.com/r/Frontend/comments/x7hgph/what_are_some_common_programming_tasks_for_front/?utm_source=share&utm_medium=web2x&context=3",
};

export const TitleOnly = Template.bind({});

/**
 * @type {import("../components/PostView").PostProps}
 */
TitleOnly.args = {
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
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, quae. Alias distinctio dolorem vero voluptas numquam aliquid iste tempore error impedit nesciunt voluptate aspernatur dolor, quas, quam quidem mollitia quibusdam veritatis explicabo minus consectetur saepe a obcaecati. Similique voluptate ut non nemo corporis quia reprehenderit, provident impedit quo voluptatem aut.",
    votes: 420,
    commentCount: 69,
    extPostLink:
        "https://www.reddit.com/r/Frontend/comments/x7hgph/what_are_some_common_programming_tasks_for_front/?utm_source=share&utm_medium=web2x&context=3",
    type: "image",
    voteState: "none",
    postLink:
        "https://www.reddit.com/r/Frontend/comments/x7hgph/what_are_some_common_programming_tasks_for_front/?utm_source=share&utm_medium=web2x&context=3",
};
