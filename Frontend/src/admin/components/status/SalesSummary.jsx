
function SalesSummary({ title, price }) {
    return (
        <div className="flex justify-between items-center pb-8 text-white">
            <span className="font-bold text-sm">{title} :</span>
            <span className="text-sm text-zinc-500">{price.toLocaleString()} تومان</span>
        </div>
    );
};

export default SalesSummary;
