import { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

function FormProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("add");
    const [ticketData, setTicketData] = useState(null);

    const openForm = (mode = "add", data = null) => {
        setMode(mode);
        setTicketData(data);
        setIsOpen(true);
    };

    const closeForm = () => setIsOpen(false);

    return (
        <FormContext.Provider value={{ isOpen, openForm, closeForm, mode, ticketData }}>
            {children}
        </FormContext.Provider>
    );
}

export const useForm = () => useContext(FormContext);
export default FormProvider;