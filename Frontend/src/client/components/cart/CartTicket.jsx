import { useContext } from "react";
import CartContext from "../../context/CartContext";

function CartTicket({ id, name, price, quantity, imageUrl }) {

    const { deleteFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

    return (
        <div className="w-full h-40 bg-gray-100 gap-1 flex overflow-hidden rounded-lg shadow">
            <div className="image__placeholder w-80 h-full">
                <img src={imageUrl || "/images/placeholder_image.webp"} onError={(e) => e.target.src = "/images/placeholder_image.webp"} className="object-cover w-full h-full" alt="" />
            </div>
            <div className="p-4 w-full">
                <h2>{name}</h2>
                <span className="w-full h-0.5 bg-yellow-400 my-2 block"></span>
                <div className="flex justify-between items-center text-sm mt-6 mb-4">
                    <span>قیمت :</span>
                    <span>{price.toLocaleString()} تومان</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <div>
                        <span className="ml-2">تعداد بلیط :</span>
                        <span>{quantity} عدد {quantity >= 8 ? "(نهایت تعداد)" : ""}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <button onClick={() => incrementQuantity(id)} className="bg-green-500 hover:bg-green-600 rounded py-1 px-2 text-white">افزایش</button>
                        <button onClick={() => decrementQuantity(id)} className="bg-yellow-300 hover:bg-yellow-400 rounded py-1 px-2 text-gray-800">کاهش</button>
                        <button onClick={() => deleteFromCart(id)} className="bg-red-500 hover:bg-red-600 rounded p-1 text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-5">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>

                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartTicket;
