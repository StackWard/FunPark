import { useEffect } from "react";
import useAxios from "../../../services/useAxios";
import Error from "../shared/Error";
import SectionTitle from "../shared/SectionTitle";
import Spinner from "../shared/Spinner";
import Ticket from "./Ticket";

function TicketsList({ ref, setFloatingCartVisible }) {

    const { fetchData, data, loading, error } = useAxios();

    useEffect(() => {
        fetchData({
            url: "/tickets",
            method: "GET",
        });
    }, []);

    return (
        <div ref={ref}>
            <SectionTitle>لیست بلیط های شهربازی</SectionTitle>
            {loading ?
                (
                    <Spinner />
                ) : (
                    error ? (
                        <Error errorMesage="متاسفانه در دریافت لیست بلیط ها مشکلی به وجود آمده :(" />
                    ) : (
                        <div className="grid grid-cols-4 max-xs:grid-cols-2 gap-10 max-xs:gap-4 w-full h-auto mt-10 max-xs:mt-2 mb-20 max-xs:mb-10 p-6 max-xs:px-4 rounded-md ">
                            {
                                data?.data?.tickets.map((ticket) => (
                                    <Ticket {...ticket} setFloatingCartVisible={setFloatingCartVisible} key={ticket._id} />
                                ))
                            }
                        </div>
                    )
                )}
        </div>
    );
};

export default TicketsList;
