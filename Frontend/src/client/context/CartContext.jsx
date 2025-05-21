import { createContext, useReducer, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const CartContext = createContext(null);

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            const currentTicket = action.payload;
            const exist = state.find(ticket => ticket.id === currentTicket.id);
            if (!exist) {
                return [...state, { ...currentTicket, quantity: 1 }];
            }
            return state;

        case "INCREMENT_QUANTITY":
            return state.map(ticket =>
                ticket.id === action.payload
                    ? { ...ticket, quantity: ticket.quantity < 8 ? ticket.quantity + 1 : ticket.quantity }
                    : ticket
            );

        case "DECREMENT_QUANTITY":
            return state.map(ticket =>
                ticket.id === action.payload
                    ? { ...ticket, quantity: ticket.quantity > 1 ? ticket.quantity - 1 : ticket.quantity }
                    : ticket
            );

        case "DELETE_TICKET":
            return state.filter(ticket => ticket.id !== action.payload);

        case "CLEAR_CART":
            return [];

        default:
            return state;
    }
}

function CartContextProvider({ children }) {

    const [localStorageValue, setLocalStorageValue] = useLocalStorage("cart", initialState);

    const [state, dispatch] = useReducer(reducer, localStorageValue);

    useEffect(() => {
        setLocalStorageValue(state);
    }, [state]);

    const addToCart = (ticket) => {
        dispatch({ type: "ADD_TO_CART", payload: ticket });
    };

    const deleteFromCart = (id) => {
        dispatch({ type: "DELETE_TICKET", payload: id });
    };

    const incrementQuantity = (id) => {
        dispatch({ type: "INCREMENT_QUANTITY", payload: id });
    };

    const decrementQuantity = (id) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: id });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    return (
        <CartContext.Provider
            value={{
                state,
                addToCart,
                deleteFromCart,
                incrementQuantity,
                decrementQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContextProvider };
export default CartContext;
