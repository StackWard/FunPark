import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import 'moment/locale/fa';

function Navbar({ name, avatar, id, username }) {
    const navigate = useNavigate();
    const [now, setNow] = useState(null);

    useEffect(() => {
        moment.locale("fa");
        moment.loadPersian({ usePersianDigits: false, dialect: 'persian-modern' });

        setNow(moment());

        const interval = setInterval(() => {
            setNow(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!now) return null;

    const formatedDate = now.format('HH:mm:ss | jYYYY/jMM/jDD');

    const handleLogout = () => {
        toast.dismiss();
        toast((t) => (
            <div>
                <div className="pt-2 pb-6">آیا از خارج شدن مطمئن هستید؟</div>
                <div className="flex items-center gap-4 w-full">
                    <button onClick={() => {
                        localStorage.removeItem("admin_token");
                        navigate("/admin/login");
                        toast.dismiss(t.id);
                        toast.success("شما با موفقیت خارج شدید");
                    }}
                        className="bg-indigo-600 w-full p-2 text-gray-50 rounded-sm hover:bg-indigo-700 duration-150"
                    >بله</button>

                    <button onClick={() => toast.dismiss(t.id)} className="bg-red-600 w-full p-2 text-gray-50 rounded-sm hover:bg-red-700 duration-150"
                    >خیر</button>
                </div>
            </div>
        ), {
            duration: 8000,
        });
    };

    return (
        <nav className="w-full bg-secondary text-gray-50">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="image__placeholder w-11 h-11 rounded-full overflow-hidden">
                        <img src={avatar || "/images/admin-avatar.jpg"} className="w-full object-cover" alt="" />
                    </div>
                    <span className="leading-5 pr-3">
                        {name ? `روز بخیر ${name} جان` : "خوش آمدید"}
                    </span>
                </div>
                <div className="my-4 flex items-center gap-4">
                    <span className="mt-1 text-zinc-400">{formatedDate}</span>
                    <Link onClick={handleLogout} className="bg-indigo-800 hover:bg-red-500 duration-300 px-3 py-1 rounded-sm">خروج</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
