const Login = ({}) => {
    return <div></div>;
};

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async (ctx) => {
    if (!ctx.req.cookies.token || !ctx.req.cookies.refresh)
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    return {
        props: {},
    };
};

export default Login;
