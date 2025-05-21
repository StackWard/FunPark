import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound";
import { CartContextProvider } from "./context/CartContext";

function ClientApp() {
    const [floatingCartVisible, setFloatingCartVisible] = useState(false);

    return (
        <CartContextProvider>
            <Routes>
                <Route path="/" element={<Home floatingCartVisible={floatingCartVisible} setFloatingCartVisible={setFloatingCartVisible} />} />
                <Route path="cart" element={<Cart />} />
                <Route path="invoice/:orderId" element={<Invoice />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
        </CartContextProvider>
    );
};

export default ClientApp;
