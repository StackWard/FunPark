import { createContext, useContext, useEffect, useReducer } from "react";
import useAxios from "../../services/useAxios";

const TicketsContext = createContext(null);

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case "SET_TICKETS":
            return action.payload;

        case "ADD_TICKET":
            return [...state, action.payload];

        case "EDIT_TICKET":
            return state.map((ticket) =>
                ticket._id === action.payload._id ? action.payload : ticket
            );

        case "REMOVE_TICKET":
            return state.filter((ticket) => ticket._id !== action.payload);

        default:
            return state;
    }
}

function TicketsProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { fetchData, data, loading, error } = useAxios();

    useEffect(() => {
        fetchData({
            url: "/tickets",
            method: "GET",
        });
    }, []);

    useEffect(() => {
        data && dispatch({ type: "SET_TICKETS", payload: data?.data?.tickets })
    }, [data])

    const editTicket = (updatedTicket) => {
        dispatch({ type: "EDIT_TICKET", payload: updatedTicket });
    };

    const removeTicket = (id) => {
        dispatch({ type: "REMOVE_TICKET", payload: id });
    };

    const addTicket = (newTicket) => {
        dispatch({ type: "ADD_TICKET", payload: newTicket });
    };

    return (
        <TicketsContext.Provider value={{
            tickets: state,
            loading,
            error,
            removeTicket,
            editTicket,
            addTicket
        }}>
            {children}
        </TicketsContext.Provider>
    );
};

export const useTickets = () => useContext(TicketsContext);
export default TicketsProvider;
