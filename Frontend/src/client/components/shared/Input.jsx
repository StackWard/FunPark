function Input({ label, type = "text", name, value, onChange, onBlur, placeholder, error, maxLength }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium">{label} :</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`w-full py-2 px-4 rounded outline-none max-xs:text-sm placeholder:text-sm placeholder:opacity-50 border ${error ? "border-red-500" : "border-transparent"}`}
            />
            {error && <p className="text-red-600 text-xs mt-3">{error}</p>}
        </div>
    );
}

export default Input;
