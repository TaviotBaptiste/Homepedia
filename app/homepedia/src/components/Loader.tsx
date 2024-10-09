const Loader = () => {
    return (
        <div
            className={"absolute top-0 left-0 flex justify-center items-center z-[2147483647] h-screen w-screen bg-white/80"}>
            <img
                className={"rounded-full zoom-box"}
                src={"/racoon-pedro.gif"}
                alt={"loader"} />
        </div>
    );
};

export default Loader;
