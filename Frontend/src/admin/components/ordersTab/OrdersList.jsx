import { useOrders } from "../../context/OrdersContext";
import Error from "../shared/Error";
import Spinner from "../shared/Spinner";
import Order from "./Order";

function OrdersList() {
    const { orders, loading, error, removeOrder } = useOrders();

    return (
        <div className="rounded-lg overflow-hidden">
            <div
                className="grid w-full gap-x-2 bg-slate-700 p-3 text-gray-100 leading-5 mb-4"
                style={{ gridTemplateColumns: "0.9fr 1.7fr 1.4fr 0.1fr" }}
            >
                <span className="text-right">اطلاعات خریدار</span>
                <span className="text-right">جزئیات خرید</span>
                <span className="text-right">بلیط ها</span>
                <span className="text-center">ابزار</span>
            </div>

            <ul className="h-auto space-y-4">
                {loading ? (
                    <Spinner />
                ) : (
                    error ? (
                        <Error errorMesage="متاسفانه در دریافت لیست سفارش ها مشکلی پیش آمده است :(" />
                    ) : (
                        orders?.map((order) => (
                            <Order {...order} removeOrder={removeOrder} key={order._id} />
                        ))
                    )
                )}
            </ul>
        </div>

    );
};

export default OrdersList;
