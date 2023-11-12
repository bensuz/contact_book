import Image from "next/image";
import logo from "../../public/assets/logo-tr.png";

const Footer = () => {
    return (
        <footer className="bg-white border-gray-200 w-full h-fit flex  items-center justify-between  px-20 shadow-xl shadow-slate-200 p-4 max-md:flex-col max-md:gap-4">
            <Image src={logo} alt="logo" className="w-auto h-10 " />
            <div className="flex flex-col items-center justify-center">
                {" "}
                <p className="text-sm text-slate-700">
                    Created by Elif Bensu Zorlu, 2023
                </p>
            </div>
        </footer>
    );
};

export default Footer;
