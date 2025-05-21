import Navbar from "./Navbar";

function Header({ onTicketsClick }) {
    return (
        <div className="w-full h-screen bg-[url(/images/header-background-image.jpg)] bg-cover bg-fixed object-cover">
            <Navbar bgColor="bg-gray-700/30" />
            <div className="w-full text-center absolute bottom-10">
                <button onClick={onTicketsClick} className="cursor-pointer bg-gray-800 opacity-95 px-3 py-2 rounded-md text-yellow-400 tracking-shadow-xl animate-bounce">
                    <svg
                        className="w-7 h-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default Header;
