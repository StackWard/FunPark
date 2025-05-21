function Input({ label, type, name, value, onChange }) {
    return (
        <div className="mb-8">
            <label className="block mb-2">{label} :</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full outline-none bg-gray-700/50 px-3 py-2 text-zinc-400"
                required
            />
        </div>
    );
}

export default Input;