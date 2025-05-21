import { useEffect, useState } from "react";
import useAxios from "../../../services/useAxios";
import SalesSummary from "../status/SalesSummary";
import MostPopularChart from "../status/MostPopularChart";
import Spinner from "../shared/Spinner";
import Error from "../shared/Error";
import useLocalStorage from "../../../hooks/useLocalStorage";

function StatusBar() {
    const { fetchData, data, loading, error } = useAxios()
    const [fetched, setFetched] = useState(false);
    const [adminToken] = useLocalStorage("admin_token", null);

    useEffect(() => {
        if (!adminToken || fetched) return;

        fetchData({
            url: "/orders/status",
            method: "GET",
            headers: {
                Authorization: "Bearer " + adminToken,
            },
        });
        setFetched(true);
    }, [adminToken, fetched]);

    return (
        <div className="w-1/4 rounded-lg bg-secondary p-6 h-full overflow-y-auto">
            {loading ? (
                <Spinner />
            ) : (
                error ? (
                    <Error errorMesage="مشکلی در دریافت آمار پیش آمده است :(" />
                ) : (
                    <>
                        <div>
                            {
                                data?.salesData?.map((item, i) => (
                                    <SalesSummary title={item.title} price={item.totalPrice} key={i} />
                                ))
                            }
                        </div>
                        <MostPopularChart data={data} />
                    </>
                )
            )
            }
        </div >
    );
};

export default StatusBar;
