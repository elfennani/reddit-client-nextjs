# Revirt

Just another reddit client. This project is being made with the power of ReactJS and NextJS.

*Note: the app is already deployed in netlify to test out. [Check it out here](https://revirted.netlify.app/).*

## Installation and Running

```console
$ git clone --branch development https://github.com/elfennani/reddit-client-nextjs.git
$ cd reddit-client-nextjs
$ git checkout development
$ npm install
$ npm run dev
```

### In case of needing to run the production build (Better performance):
```console
$ npm run production
```

In need to run storybook(Currently not working because many of the components were deleted):

```console
$ npm run storybook
```

If you want to use your own client_id and client_secret, then create `.env.local` file to pass environment variables:
```
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
HOST=http://localhost:3000
```
Change the `HOST` when you deploy to your own domain or you used a different local domain.

## Links
-   [Figma File](https://www.figma.com/file/FJF4kqQaKnRVm6ZNV1lGa2/Reddit-Redesign?node-id=0%3A1)
-   [Official Reddit OAuth guide](https://github.com/reddit-archive/reddit/wiki/OAuth2)
-   [Reddit OAuth API docs](https://www.reddit.com/dev/api/oauth)

## Current State

What works:

-   Authentication
-   Display account information in the sidebar
-   Anonymous Browsing (No Signing Required)
-   Upvoting and Downvoting
-   Saving Posts
-   Infinite Scrolling
-   Modal routing for posts
-   Browsing individual Subreddits
-   Light and Dark Theme

With many other feature coming later.

***Revirt** is a hobby project, its purpose is only to showcase and be a part of my portfolio.*
