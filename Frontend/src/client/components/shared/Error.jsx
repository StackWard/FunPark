function Error({ errorMesage }) {
    return (
        <div className="w-full bg-red-400 text-white text-center my-10 p-4">
            {errorMesage}
        </div>
    );
};

export default Error;
