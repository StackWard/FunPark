import { use, useState } from "react";
import useAxios from "../../services/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

function Login() {
    const [passwordType, setPasswordType] = useState("password");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { fetchData } = useAxios();
    const navigate = useNavigate();
    const [adminToken, setAdminToken] = useLocalStorage("admin_token", null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("در حال اعتبارسنجی...")

            const response = await fetchData({
                url: "/login",
                method: "POST",
                body: {
                    "username": username,
                    "password": password,
                },
            });

            toast.dismiss();

            if (response.success) {
                setAdminToken(response.token)
                toast.success("شما با موفقیت وارد شدید")
                navigate("/admin/dashboard")
                setPassword("");
                setUsername("");

            } else {
                toast.error("کاربری با این مشخصات وجود ندارد")
            }

        } catch (err) {
            console.error(err.message)
            toast.dismiss();
            toast.error("خطا در ارتباط با سرور" || err.message)
        }
    };

    return (
        <div className="w-full h-screen flex items-center text-white bg-[url('/images/login-page-background.jpg')] bg-cover">
            <form onSubmit={handleSubmit} className="w-1/3 h-auto mx-auto p-10 bg-gray-800/50 backdrop-blur-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 mx-auto  mb-4 stroke-sky-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <h2 className="text-center text-2xl">پنــــل ادمین</h2>
                <div className="pt-6">
                    <label className="block pb-2 text-lg">نام کاربری:</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} dir="ltr" maxLength={40} type="text" className="outline-none w-full text-lg bg-gray-950/30 px-4 pt-2 pb-0.5 border-b-2 border-sky-500" />
                </div>
                <div className="pt-6">
                    <label className="block pb-2 text-lg">رمز عبور:</label>
                    <div className="relative">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} dir="ltr" maxLength={25} type={passwordType} className="outline-none w-full text-lg bg-gray-950/30 px-4 pt-2 pb-0.5 border-b-2 border-sky-500" />
                        <button type="button" onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}>
                            {
                                passwordType === "password" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 absolute top-2 right-2 opacity-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 absolute top-2 right-2 opacity-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <button type="submit" className="mt-20 p-3 text-center w-full bg-sky-700 hover:bg-sky-600">ورود</button>
            </form >
        </div >
    );
};

export default Login;
