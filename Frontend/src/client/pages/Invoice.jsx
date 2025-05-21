import { useEffect } from "react";
import Factor from "../components/invoice/Factor";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

function Invoice() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="w-[1280px] mx-auto">
                <Navbar bgColor="bg-gray-600/60" />
                <Factor />
            </div>
            <Footer />
        </>
    );
};

export default Invoice;
