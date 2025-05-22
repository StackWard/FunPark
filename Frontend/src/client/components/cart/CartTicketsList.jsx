import { useContext } from "react";
import CartTicket from "./CartTicket";
import CartContext from "../../context/CartContext";
import Error from "../shared/Error";

function CartTicketsList() {
    const { state } = useContext(CartContext);

    return (
        <div className="my-20 max-xs:mb-12 max-xs:px-4">
            {state.length === 0 ? (
                <Error errorMesage="سبد خرید شما خالی است لطفا ابتدا بلیط های خود را انتخاب نمایید." />
            ) : (
                <div className="grid grid-cols-2 max-xs:grid-cols-1 gap-8">
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
