import moment from "moment-jalaali";
import 'moment/locale/fa';
import { useParams } from "react-router-dom";
import useAxios from "../../../services/useAxios";
import Spinner from "../shared/Spinner";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";


function Factor() {
    moment.locale("fa");
    moment.loadPersian({ usePersianDigits: false, dialect: 'persian-modern' });

    const factorRef = useRef();
    const { orderId } = useParams();

    const { fetchData, data, loading, error } = useAxios();
    useEffect(() => {
        fetchData({
            url: `/orders/${orderId}`,
            method: "GET",
        })
    }, [orderId]);

    const date = data?.data?.createdAt;
    const formatedDate = date ? moment(date).format('dddd jD jMMMM [ساعت] HH:mm') : "";

    const trackingCode = data?.data?._id;
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(trackingCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed: ", err);
        }
    };

    const handleDownloadImage = () => {
        html2canvas(factorRef.current).then(canvas => {
            const link = document.createElement("a");
            link.download = `factor-${trackingCode}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        loading || !data ? (
            <div className="w-full h-screen mt-40">
                <Spinner />
                <div className="text-center mt-10">در حال ساخت فاکتور شما...</div>
            </div>
        ) : (
            error ? (
                <div></div>
            ) : (
                <div className="w-2/5 h-auto mx-auto bg-gray-50 mt-44 mb-20 shadow-lg">
                    <div ref={factorRef} className="">
                        <div className="text-center p-6 bg-green-500 text-white font-bold text-lg">سفارش شما با موفقیت ثبت شد</div>

                        <div className="p-6 space-y-7 text-sm">
                            <div className="flex justify-between  text-zinc-500 ">
                                <span>نام و نام خانوادگی:</span>
                                <span>{data.data.fullName}</span>
                            </div>
                            <div className="flex justify-between  text-zinc-500 ">
                                <span>شماره تماس:</span>
                                <span>{data.data.phone}</span>
                            </div>
                            <div className="flex justify-between  text-zinc-500 ">
                                <span>تاریخ خرید:</span>
                                <span>{formatedDate}</span>
                            </div>
                            <div className="flex justify-between  text-zinc-500 ">
                                <span>مجموع قیمت:</span>
                                <span>{data.data.total.toLocaleString()} تومان</span>
                            </div>
                            <span className="h-[1px] w-full bg-zinc-500 block"></span>
                            <div className=" text-zinc-500">
                                لیست بلیط های شما:
                                <ul className="text-xs mt-4 px-4 bg-zinc-100 text-zinc-500 divide-y">
                                    {data.data.items.map((ticket) => (
                                        <li className="flex justify-between py-5" key={ticket._id}>
                                            <span>{ticket.name}</span>
                                            <span>{ticket.quantity} عدد</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-x-2 text-gray-500 items-center my-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1.5" stroke="#ffae00" className="size-6 align-middle">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                <p className="text-sm">توجه: لطفا کد پیگیری زیر را در جایی ذخیره نمایید.</p>
                            </div>
                        </div>

                        <div className="flex items-center text-center pt-4 pb-4 px-6 gap-x-2 text-zinc-500 bg-green-400/20">
                            <span>کد پیگیری:</span>
                            <span className="text-sm">{trackingCode}</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={handleCopy} className="py-4 px-8 w-1/3 bg-green-500 hover:bg-green-600 duration-150 text-white">{copied ? "کپی شــد" : "کپی کردن"}</button>

                        <button onClick={handleDownloadImage} className="flex items-end justify-center gap-2 w-2/3 p-4 bg-yellow-300 hover:bg-yellow-400 duration-150">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span className="leading-5">دانلود فاکتور به صورت عکس</span>
                        </button>
                    </div>
                </div>
            )
        )
    );
};

export default Factor;
