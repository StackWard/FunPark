import { createContext, useContext, useEffect, useReducer } from "react";
import useAxios from "../../services/useAxios";
import useLocalStorage from "../../hooks/useLocalStorage";

const OrdersContext = createContext(null);

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case "SET_ORDERS":
            return action.payload;

        case "REMOVE_ORDER":
            return state.filter((order) => order._id !== action.payload)

        default:
            return state;
    }
}

function OrdersProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { fetchData, data, loading, error } = useAxios();
    const [adminToken, setAdminToken] = useLocalStorage("admin_token", null);

    useEffect(() => {
        if (!adminToken) return;

        fetchData({
            url: "/orders/?reverse=true",
            method: "GET",
            headers: {
                Authorization: "Bearer " + adminToken
            }
        });
    }, [adminToken])

    useEffect(() => {
        data && dispatch({ type: "SET_ORDERS", payload: data?.data?.orders })
    }, [data])

    const removeOrder = (id) => {
        dispatch({ type: "REMOVE_ORDER", payload: id });
    };


    return (
        <OrdersContext.Provider value={{ orders: state, fetchData, loading, error, removeOrder }}>
            {children}
        </OrdersContext.Provider >
    );
};

export const useOrders = () => useContext(OrdersContext);
export default OrdersProvider;
