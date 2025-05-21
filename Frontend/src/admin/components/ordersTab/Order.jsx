import moment from "moment-jalaali";
import 'moment/locale/fa';
import useAxios from "../../../services/useAxios";
import toast from "react-hot-toast";

function Order({ _id, fullName, createdAt, phone, items, removeOrder }) {
    const adminToken = JSON.parse(localStorage.getItem("admin_token"));

    moment.locale("fa");
    moment.loadPersian({ usePersianDigits: false, dialect: 'persian-modern' });
    const formatedDate = createdAt ? moment(createdAt).format('jYYYY/jMM/jDD | HH:mm') : "";


    const { fetchData } = useAxios();

    const handleDelete = (id) => {
        toast.dismiss();
        toast((t) => (
            <div>
                <div className="pt-2 pb-6">آیا از حذف این سفارش مطمئن هستید؟</div>
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={() => {
                            handleDeleteOrder(id);
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

    const handleDeleteOrder = async (id) => {
        try {
            toast.loading("در حال حذف کردن...")
            const response = await fetchData({
                url: `/orders/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + adminToken
                },
            });
            toast.dismiss();

            if (response.success) {
                removeOrder(id);
                toast.success("سفارش با موفقیت حذف شد")
            } else {
                toast.error("مشکلی در حذف سفارش پیش آمده است")
            }

        } catch (err) {
            console.error(err.message);
            toast.dismiss();
            toast.error("خطا در برقراری ارتباط با سرور" || err.message);
        }


    };

    return (
        <li className="bg-slate-800 text-zinc-200 grid w-full gap-x-8 my-2 leading-5 text-sm p-3" style={{ gridTemplateColumns: "0.9fr 1.7fr 1.4fr 0.1fr" }}>
            <div className="flex flex-col space-y-2">
                <span>نام : <span className="text-zinc-400">{fullName}</span></span>
                <span>شماره تماس : <span className="text-zinc-400 tracking-wider">{phone}</span></span>
            </div>
            <div className="flex flex-col space-y-2">
                <span>کد رهگیری : <span className="text-zinc-400">{_id}</span></span>
                <span>تاریخ خرید : <span className="text-zinc-400 tracking-wider">{formatedDate}</span></span>
                {/* <span>مجموع قیمت : </span> */}
            </div>
            <div className="pl-6 text-xs text-zinc-400">
                {items.map(item => `${item.name} (${item.quantity})`).join(" - ")}
            </div>
            <button onClick={() => handleDelete(_id)} className="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 stroke-red-500 hover:stroke-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </li>
    );
};

export default Order;
