
function Error({ errorMesage, fontSize = "text-base" }) {
    return (
        <div className={`w-full bg-red-700 text-white text-center my-10 p-4 ${fontSize}`}>
            {errorMesage}
        </div>
    );
};

export default Error;
