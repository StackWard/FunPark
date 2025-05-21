import { useState } from "react";
import Tickets from "../../pages/Tickets";
import PanelTab from "./PanelTab";
import Orders from "../../pages/Orders";

function Panel() {
    const [activePanel, setActivePanel] = useState("orders")

    return (
        <div className="w-3/4 rounded-lg bg-secondary overflow-y-auto h-full flex flex-col custom-scrollbar">
            <PanelTab activePanel={activePanel} setActivePanel={setActivePanel} />
            <div className="flex-1 overflow-y-auto">
                {activePanel === "orders" && <Orders />}
                {activePanel === "tickets" && <Tickets />}
            </div>
        </div>
    );
};

export default Panel;
