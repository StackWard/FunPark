import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";

function FloatingCart({ floatingCartVisible }) {
    const { state } = useContext(CartContext);

    return (
        <div className={`${floatingCartVisible ? "fixed" : "hidden"} bottom-8 left-8 max-xs:left-4 max-xs:bottom-6 z-50 bg-red-500 p-2 rounded-full`}>
            <Link to="/cart" className="relative">
                {
                    state.length !== 0 ? <span className="absolute left-6 bottom-6 max-xs:left-5 max-xs:bottom-5 bg-red-500 text-white rounded-full w-6 h-6 p-0.5 text-center">{state.length}</span> : ""
                }

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-8 max-xs:size-7 hover:fill-yellow-400 duration-150">
                    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    );
};

export default FloatingCart;
