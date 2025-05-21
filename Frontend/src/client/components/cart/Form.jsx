import { useContext, useEffect, useState } from "react";
import Input from "../shared/Input";
import SectionTitle from "../shared/SectionTitle";
import CartContext from "../../context/CartContext";
import useAxios from "../../../services/useAxios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Form() {
    const { state, clearCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const { fetchData } = useAxios();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    useEffect(() => {
        const total = state.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [state]);

    const nameRegex = /^[\u0600-\u06FF\s]+$/;
    const phoneRegex = /^09\d{9}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "firstName" || name === "lastName") && /[0-9]/.test(value)) return;

        if (name === "phone") {
            const digits = value.replace(/\D/g, "");
            setFormData((prev) => ({ ...prev, [name]: digits }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, [name]: "پر کردن این فیلد الزامی است" }));
            return;
        }

        if ((name === "firstName" || name === "lastName") && !nameRegex.test(value)) {
            setErrors((prev) => ({ ...prev, [name]: "فقط حروف فارسی مجاز است" }));
        } else if (name === "phone" && !phoneRegex.test(value)) {
            setErrors((prev) => ({ ...prev, [name]: "شماره تماس باید با 09 شروع شود و 11 رقم باشد" }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state.length === 0) {
            toast.error("شما باید حداقل یک بلیط را انتخاب کنید");
            return;
        }

        const validationErrors = {};

        if (!formData.firstName.trim()) validationErrors.firstName = "پر کردن این فیلد الزامی است";
        else if (!nameRegex.test(formData.firstName)) validationErrors.firstName = "فقط حروف فارسی مجاز است";

        if (!formData.lastName.trim()) validationErrors.lastName = "پر کردن این فیلد الزامی است";
        else if (!nameRegex.test(formData.lastName)) validationErrors.lastName = "فقط حروف فارسی مجاز است";

        if (!formData.phone.trim()) validationErrors.phone = "پر کردن این فیلد الزامی است";
        else if (!phoneRegex.test(formData.phone)) validationErrors.phone = "شماره تماس باید 11 رقم باشد و با 09 شروع شود";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            toast.loading("در حال ثبت سفارش...");

            const odereData = {
                fullName: `${formData.firstName} ${formData.lastName}`,
                phone: formData.phone,
                items: state.map((item) => ({
                    _id: item.id,
                    quantity: item.quantity,
                })),
            };

            const response = await fetchData({
                url: "/orders",
                method: "POST",
                body: odereData,
            });

            toast.dismiss();

            if (response.success) {
                toast.success("سفارش با موفقیت ثبت شد");
                clearCart();
                setFormData({ firstName: "", lastName: "", phone: "" });
                navigate(`/invoice/${response.orderId}`);

            } else {
                toast.error("مشکلی پیش آمد، لطفا مجددا تلاش کنید");

            }
        } catch (err) {
            toast.dismiss();
            toast.error("خطا در ثبت سفارش" || err.message);
        }
    };

    return (
        <div className="my-20">
            <SectionTitle>لطفا اطلاعات زیر را تکمیل کنید</SectionTitle>

            <div className="flex gap-2 items-end mb-4">
                <svg className="size-6" fill="none" stroke="#ffae00" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <p className="text-sm text-gray-600">توجه: اطلاعات را با دقت پر نمایید تا سفارش شما قابل پیگیری باشد.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
                <div className="grid grid-cols-3 gap-10">
                    <Input
                        label="نام"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="مثال: محسن"
                        error={errors.firstName}
                    />
                    <Input
                        label="نام خانوادگی"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="مثال: نعمت زاده"
                        error={errors.lastName}
                    />
                    <Input
                        label="شماره تماس"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="مثال: 09119876543"
                        error={errors.phone}
                        maxLength={11}
                    />
                </div>

                <div className="flex gap-4 my-10">
                    <div className="w-1/3 flex justify-between items-center p-4 bg-gray-600 text-white">
                        <span>مجموع قیمت :</span>
                        <span>{totalPrice.toLocaleString()} تومان</span>
                    </div>
                    <button
                        type="submit"
                        className="w-2/3 border border-green-600 bg-green-600 hover:bg-green-600/10 hover:text-green-600 text-white font-bold text-lg p-4 duration-300"
                    >
                        ثبت نهایی سفارش
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
