import { NavLink } from "react-router-dom";

function PanelTab({ activePanel, setActivePanel }) {
    return (
        <div className="flex items-center w-full bg-slate-800 text-gray-50 mb-2">
            <NavLink to="orders" onClick={() => setActivePanel("orders")} className={`w-full p-4 text-center ${activePanel === "orders" && "bg-slate-700"}`}>لیست سفارشات</NavLink>

            <NavLink to="tickets" onClick={() => setActivePanel("tickets")} className={`w-full p-4 text-center ${activePanel === "tickets" && "bg-slate-700"}`}>لیست بلیط ها</NavLink>
        </div>
    );
};

export default PanelTab;
