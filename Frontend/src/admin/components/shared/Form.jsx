import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";
import Input from "./Input";
import useAxios from "../../../services/useAxios";
import { useTickets } from "../../context/TicketsContext";
import toast from "react-hot-toast";
import useLocalStorage from "../../../hooks/useLocalStorage";

function Form() {
    const { isOpen, closeForm, mode, ticketData } = useForm();
    const { fetchData } = useAxios();
    const { addTicket, editTicket } = useTickets();
    const [adminToken] = useLocalStorage("admin_token", null);


    const [formData, setFormData] = useState({
        name: "",
        price: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (mode === "edit" && ticketData) {
            setFormData({
                name: ticketData.name,
                price: ticketData.price,
                imageUrl: ticketData.imageUrl,
            });
        } else {
            setFormData({ name: "", price: "", imageUrl: "" });
        }
    }, [mode, ticketData]);

    const handleOverlayClick = (e) => {
        e.target === e.currentTarget && closeForm();
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            name: formData.name,
            price: formData.price,
            imageUrl: formData.imageUrl,
        };

        const action = mode === "add" ? "در حال افزودن بلیط جدید..." : "در حال ویرایش بلیط...";
        const successMsg = mode === "add" ? "بلیط جدید با موفقیت اضافه شد" : "بلیط با موفقیت ویرایش شد";
        const errorMsg = "خطایی رخ داد. لطفا دوباره تلاش کنید.";

        const toastId = toast.loading(action);

        try {
            if (mode === "add") {
                const result = await fetchData({
                    url: "/tickets",
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + adminToken
                    },
                    body,
                });
                console.log(result)

                if (result?.data) {
                    addTicket(result?.data);
                    toast.success(successMsg, { id: toastId });
                    closeForm();
                } else {
                    throw new Error("Ticket creation failed");
                }

            } else if (mode === "edit" && ticketData?._id) {
                const result = await fetchData({
                    url: `/tickets/${ticketData._id}`,
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + adminToken
                    },
                    body,
                });

                if (result?.data?.ticket) {
                    editTicket(result.data.ticket);
                    toast.success(successMsg, { id: toastId });
                } else {
                    throw new Error("Ticket update failed");
                }
            }

            closeForm();

        } catch (err) {
            console.error("Form submission failed", err);
            toast.error(errorMsg, { id: toastId });
        }
    };

    return (
        isOpen && (
            <div onClick={handleOverlayClick} className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-md flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-2/5 bg-gray-800 text-zinc-100 p-6 rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-bold">{mode === "edit" ? "ویرایش بلیط" : "افزودن بلیط جدید"}</h2>
                        <button onClick={closeForm} className="text-5xl duration-150 hover:rotate-180 group">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 rotate-45 group-hover:fill-red-500">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <Input label="نام بلیط" type="text" name="name" value={formData.name} onChange={handleChange} />
                    <Input label="قیمت" type="text" name="price" value={formData.price} onChange={handleChange} />
                    <Input label="آدرس عکس (URL)" type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

                    <button type="submit" className="w-full mx-auto bg-indigo-700 hover:bg-indigo-800 p-2 mt-6 text-lg">
                        {mode === "edit" ? "ویرایش" : "افزودن بلیط جدید"}
                    </button>
                </form>
            </div>
        )
    );
}

export default Form;