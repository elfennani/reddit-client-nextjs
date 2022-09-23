import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = ({}) => {
    const router = useRouter();
    useEffect(() => {
        Cookies.remove("token");
        Cookies.remove("refresh");
        router.reload();
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;
