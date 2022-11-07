import Head from "next/head";
import { useRouter } from "next/router";
import StandartLayout from "../components/PageLayouts/StandardLayout";
import PostsList from "../components/PostsList";

const Index = ({}) => {
    const router = useRouter();
    return (
        <StandartLayout>
            <Head>
                <title>Home Page</title>
            </Head>
            {/* <CreatePost /> */}
            <PostsList />
        </StandartLayout>
    );
};

export default Index;
