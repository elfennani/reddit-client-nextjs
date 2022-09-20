const Index = ({}) => {
    return <div></div>;
};

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async (ctx) => {
    return {
        redirect: { destination: "/" },
    };
};

export default Index;
