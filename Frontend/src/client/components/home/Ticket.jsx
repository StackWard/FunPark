import { useContext } from "react";
import CartContext from "../../context/CartContext";

function Ticket({ _id, name, imageUrl, price, setFloatingCartVisible }) {
    const { state, addToCart } = useContext(CartContext);

    const isInCart = state.some(item => item.id === _id);

    const addItemToCart = () => {
        setFloatingCartVisible(true);
        addToCart({
            id: _id,
            name: name,
            imageUrl: imageUrl,
            price: price
        })
    }

    return (
        <div className="group overflow-hidden bg-gray-100 rounded-lg hover:transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="image__placeholder rounded-lg h-44 overflow-hidden">
                <img src={imageUrl || "/images/placeholder_image.webp"} onError={(e) => e.target.src = "/images/placeholder_image.webp"} className="rounded-lg w-full h-full object-cover duration-300 group-hover:scale-110 group-hover:rotate-3" />
            </div>
            <div className="p-4">
                <h2 className="truncate text-center mb-8 p-1 font-bold bg-gradient-to-r from-white/0 via-yellow-300 to-white/0">{name}</h2>
                <div className="flex justify-between items-center text-sm">
                    <span>قیمت :</span>
                    <span>{price.toLocaleString()} تومان</span>
                </div>
                <button className={`text-center w-full font-bold ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white mt-4 mb-2 p-2 rounded-md`} onClick={addItemToCart} disabled={isInCart}>{isInCart ? "هم اکنون در سبد خرید است" : "افزودن به سبد خرید"}</button>
            </div>
        </div>
    );
};

export default Ticket;
