import Ticket from "./Ticket";
import Spinner from "../shared/Spinner";
import { useTickets } from "../../context/TicketsContext"
import Error from "../shared/Error";
import { useForm } from "../../context/FormContext";

function TicketsList() {
    const { tickets, loading, error, removeTicket } = useTickets();
    const { openForm } = useForm();

    return (
        <ul className="h-auto space-y-6">
            <button
                className="w-full py-3 rounded hover:bg-indigo-700 leading-5 bg-indigo-800 text-white"
                onClick={() => openForm("add")}
            >
                افزودن بلیط جدید
            </button>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Error errorMesage="متاسفانه در دریافت لیست بلیط ها مشکلی پیش آمده است :(" />
            ) : (
                tickets?.map((ticket) => <Ticket {...ticket} removeTicket={removeTicket} key={ticket._id} />)
            )}
        </ul>
    );
}

export default TicketsList;