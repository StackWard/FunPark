import toast from "react-hot-toast";
import { useForm } from "../../context/FormContext";
import useAxios from "../../../services/useAxios";


function Ticket({ _id, name, imageUrl, price, removeTicket }) {
    const { openForm } = useForm();
    const { fetchData } = useAxios();
    const adminToken = JSON.parse(localStorage.getItem("admin_token"));


    const handleDelete = (id) => {
        toast.dismiss();
        toast((t) => (
            <div>
                <div className="pt-2 pb-6">آیا از حذف این بلیط مطمئن هستید؟</div>
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={() => {
                            handleDeleteTicket(id);
                            toast.dismiss(t.id);
                        }}
                        className="bg-indigo-600 w-full p-2 text-gray-50 rounded-sm hover:bg-indigo-700 duration-150"
                    >بله</button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-red-600 w-full p-2 text-gray-50 rounded-sm hover:bg-red-700 duration-150"
                    >خیر</button>
                </div>
            </div>
        ), {
            duration: 8000,
        });

    }

    const handleDeleteTicket = async (id) => {
        try {
            toast.loading("در حال حذف کردن...")
            const response = await fetchData({
                url: `/tickets/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + adminToken
                },
            });
            toast.dismiss();

            if (response.success) {
                removeTicket(id);
                toast.success("بلیط با موفقیت حذف شد")
            } else {
                toast.error("مشکلی در حذف بلیط پیش آمده است")
            }

        } catch (err) {
            console.error(err.message);
            toast.dismiss();
            toast.error("خطا در برقراری ارتباط با سرور" || err.message);
        }
    };

    return (
        <li className="flex justify-between bg-slate-800 rounded-sm overflow-hidden text-zinc-200">
            <div className="flex gap-4 items-center">
                <div className="image__placeholder w-32 h-24">
                    <img src={imageUrl || "/images/placeholder_image.webp"} onError={(e) => e.target.src = "/images/placeholder_image.webp"} className="w-full h-full object-cover" alt="تصویر وسیله بازی" />
                </div>
                <div>
                    <h3>{name}</h3>
                    <span className="pt-5 inline-block">قیمت: {price.toLocaleString()} تومان</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 mx-4 my-2 text-sm justify-around">
                <button
                    onClick={() => openForm("edit", { _id, name, imageUrl, price })}
                    className="border border-yellow-400 hover:bg-yellow-400 hover:text-zinc-700 rounded-sm text-yellow-400 py-1 px-2 duration-150"
                >
                    ویرایش
                </button>
                <button onClick={() => handleDelete(_id)} className="border border-red-400 hover:bg-red-500 hover:text-white rounded-sm text-red-400 py-1 px-2 duration-150">
                    حذف
                </button>
            </div>
        </li>
    );
}

export default Ticket;