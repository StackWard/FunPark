import { useEffect } from "react";
import CartTicketsList from "../components/cart/CartTicketsList";
import Footer from "../components/layout/Footer";
import Form from "../components/cart/Form";
import Navbar from "../components/layout/Navbar";

function Cart() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="max-w-[1280px] mx-auto">
                <Navbar bgColor="bg-gray-600/60" />
                <CartTicketsList />
                <Form />
            </div>
            <Footer />
        </>
    );
};

export default Cart;
