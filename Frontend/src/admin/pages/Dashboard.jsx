import { useEffect } from "react";
import useAxios from "../../services/useAxios";
import Navbar from "../components/layout/Navbar";
import StatusBar from "../components/layout/StatusBar";
import Panel from "../components/layout/Panel";
import useLocalStorage from "../../hooks/useLocalStorage";

function Dashboard() {
    const { fetchData, data, loading, error } = useAxios()
    const [adminToken] = useLocalStorage("admin_token", null);

    useEffect(() => {
        if (!adminToken) return;
        fetchData({
            url: "/login",
            method: "GET",
            headers: {
                Authorization: "Bearer " + adminToken
            }
        })
    }, [adminToken]);

    return (
        <div className="bg-primary h-screen flex flex-col">
            <Navbar {...data?.user} />
            <div className="w-11/12 mx-auto flex gap-5 my-4 flex-1 overflow-hidden">
                <StatusBar />
                <Panel />
            </div>
        </div>
    );
};

export default Dashboard;
