import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

function Contact({ contact, handleEditContact, handleDeleteContact }) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-10 max-lg:gap-2 max-lg:flex-col py-5">
                <p className="w-full text-center text-slate-600 max-lg:border-b max-lg:border-slate-200/50 overflow-hidden break-words">
                    {contact.name}
                </p>
                <p className="w-full text-center text-slate-600 max-lg:border-b max-lg:border-slate-200/50 overflow-hidden break-words">
                    {contact.email}
                </p>
                <p className="w-full text-center text-slate-600 max-lg:border-b max-lg:border-slate-200/50 overflow-hidden break-words">
                    {contact.phone_number}
                </p>
                <p className="w-full text-center text-slate-600 max-lg:border-b max-lg:border-slate-200/50 overflow-hidden break-words">
                    {contact.address}
                </p>
            </div>
            <div className="flex max-[1400px]:flex-col items-center justify-center gap-4 max-lg:gap-2 max-lg:py-2 ml-4 mr-2 ">
                <button
                    className="text-teal-500 text-2xl font-medium"
                    onClick={() => handleEditContact(contact)}
                >
                    <BiSolidEditAlt />
                </button>
                <button
                    className="text-teal-500 text-2xl font-medium"
                    onClick={() => handleDeleteContact(contact.id)}
                >
                    <MdDeleteForever />
                </button>
            </div>
        </div>
    );
}

export default Contact;
