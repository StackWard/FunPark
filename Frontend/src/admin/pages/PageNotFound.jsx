import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (count >= 404) return;

        const interval = setInterval(() => {
            setCount(count => count + 1);
        }, 2);

        return () => clearInterval(interval);
    }, [count])

    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen bg-amber-100">
            <div className={`text-6xl`}>😢 {count} 😢</div>
            <h1 className={`text-3xl mb-2`}>صفحه مورد نظر شما یافت نشد!</h1>
            <p className="mb-6">به نظر میرسد صفحه ای که دنبال آن هستید دیگر وجود ندارد و یا به آدرس دیگری تغییر کرده است.</p>
            <Link to="/admin/login" className="bg-yellow-400 px-4 py-3  rounded-md flex gap-2 items-center hover:bg-yellow-300">
                بازگشت به صفحه ورود
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

            </Link>
        </div>
    );
};

export default PageNotFound;
