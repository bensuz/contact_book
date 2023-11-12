import Image from "next/image";
import logo from "../../public/assets/logo-tr.png";

const Header = () => {
    return (
        <nav className="bg-white w-full border-gray-200 h-24 flex items-center justify-start px-20 shadow-xl shadow-slate-200">
            <div>
                <Image
                    src={logo}
                    alt="logo"
                    className="w-auto h-16 max-sm:h-12"
                />
            </div>
        </nav>
    );
};

export default Header;
