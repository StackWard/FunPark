import { useRef } from "react";
import About from "../components/home/About";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import TicketsList from "../components/home/TicketsList";
import FloatingCart from "../components/home/FloatingCart";

function Home({ floatingCartVisible, setFloatingCartVisible }) {
    const ticketsRef = useRef(null);

    const scrollToTickets = () => {
        ticketsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Header onTicketsClick={scrollToTickets} />
            <main className="w-[1280px] mx-auto mt-10 mb-40">
                <TicketsList ref={ticketsRef} setFloatingCartVisible={setFloatingCartVisible} />
                <About />
            </main>
            <FloatingCart floatingCartVisible={floatingCartVisible} />
            <Footer />
        </>
    );
};

export default Home;
