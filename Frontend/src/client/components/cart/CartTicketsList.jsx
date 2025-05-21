import { useContext } from "react";
import CartTicket from "./CartTicket";
import CartContext from "../../context/CartContext";
import Error from "../shared/Error";

function CartTicketsList() {
    const { state } = useContext(CartContext);

    return (
        <div className="mt-40">
            {state.length === 0 ? (
                <Error errorMesage="سبد خرید شما خالی است لطفا ابتدا بلیط های خود را انتخاب نمایید." />
            ) : (
                <div className="grid grid-cols-2 gap-8">
                    {state.map((ticket) => (
                        <CartTicket key={ticket.id} {...ticket} />
                    ))
                    }
                </div >
            )}
        </div>
    );
};

export default CartTicketsList;
