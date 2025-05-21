import FormProvider from "../context/FormContext";
import OrdersProvider from "../context/OrdersContext";
import TicketsProvider from "../context/TicketsContext";

function AppProviders({ children }) {
    return (
        <TicketsProvider>
            <OrdersProvider>
                <FormProvider>
                    {children}
                </FormProvider>
            </OrdersProvider>
        </TicketsProvider>
    );
};

export default AppProviders;
