"use client";

import axios from "@/utils/axiosInstance";
import { IoMdPersonAdd } from "react-icons/io";
import CreateContact from "./CreateContact";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Contact from "./Contact";

const ContactForm = () => {
    const [contacts, setContacts] = useState({});
    const [loading, setLoading] = useState(true);
    const [isCreatingContact, setIsCreatingContact] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editedContact, setEditedContact] = useState({
        name: "",
        email: "",
        phone_number: "",
        address: "",
    });

    const defaultSwalOptions = {
        allowOutsideClick: "true",
        allowEnterKey: "true",
        buttonsStyling: false,
        customClass: {
            popup: "sweetalert-custom-popup",
            confirmButton: "sweetalert-custom-button",
        },
        width: "28rem",
        height: "24rem",
        showClass: {
            popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp",
        },
    };

    const fetchData = () => {
        axios
            .get(`/api/contacts/`)
            .then((res) => {
                const data = res.data;
                data.sort((a, b) => a.id - b.id);
                setContacts(data);
                setLoading(false);
            })
            .catch((e) => {
                Swal.fire({
                    title: `Error Received: ${e.message}`,
                    icon: "error",
                    ...defaultSwalOptions,
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteContact = (contactId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            width: "28rem",
            height: "24rem",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(`/api/contacts/${contactId}`)
                        .then(() => {
                            fetchData();
                        })
                        .then((res) => {
                            Swal.fire(
                                "Deleted!",
                                "Contact has been deleted from ContactBook.",
                                "success"
                            );
                        })
                        .catch((e) => {
                            Swal.fire({
                                title: `Error Received: ${e.message}`,
                                icon: "error",
                                ...defaultSwalOptions,
                            });
                        });
                }
            })
            .catch((e) => {
                Swal.fire({
                    title: `Error Received: ${e.message}`,
                    icon: "error",
                    ...defaultSwalOptions,
                });
            });
    };

    const handleContactAdded = (contact) => {
        const { name, email, phone_number, address } = contact;
        axios
            .post(`/api/contacts/`, {
                name,
                email,
                phone_number,
                address,
            })
            .then(() => {
                setIsCreatingContact(false);
                fetchData();
                Swal.fire({
                    title: "New contact added",
                    icon: "success",
                    ...defaultSwalOptions,
                });
            })
            .catch((e) => {
                Swal.fire({
                    title: `Error Received: ${e.message}`,
                    icon: "error",
                    ...defaultSwalOptions,
                });
            });
    };

    const handleEditContact = (contact) => {
        setEditedContact(contact);
        setEditMode(true);
    };

    const handleSaveContact = (contact) => {
        axios
            .put(`/api/contacts/${editedContact.id}`, contact)
            .then(() => {
                fetchData();
                setEditMode(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="w-full min-h-[50rem] flex flex-col items-start justify-start mb-10 mt-10">
            {loading ? (
                <div className="flex items-center justify-center gap-4 self-center">
                    <div className="animate-spin rounded-full border-t-4 border-teal-500 h-12 w-12"></div>
                    <div className="text-lg font-medium text-teal-700">
                        Loading...
                    </div>
                </div>
            ) : (
                <div className="w-full  flex flex-col gap-10 items-center justify-start max-lg:mt-16">
                    {/* Search Box & New Contact Button */}
                    <div className="flex items-center justify-center w-full px-8 py-2 gap-3 max-lg:flex-col ">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search contacts..."
                            className="bg-white border-2 border-teal-500 md:text-lg text-md font-medium text-teal-500 px-4 rounded-md flex items-center justify-center h-9 w-[22rem] max-sm:w-[18rem]"
                        />{" "}
                        <button
                            onClick={() =>
                                setIsCreatingContact(!isCreatingContact)
                            }
                            className="bg-white border-2 border-teal-500 md:text-lg text-md font-medium text-teal-500 px-2 rounded-md flex items-center justify-center gap-2 w-[12rem] h-9"
                        >
                            New Contact{" "}
                            <IoMdPersonAdd className="font-medium text-xl " />
                        </button>
                    </div>
                    {/* Table */}
                    <div className=" w-full flex items-center justify-center">
                        <div className="w-full max-w-7xl px-4 flex flex-col items-center justify-center bg-white rounded-xl">
                            {/* Header */}
                            <div className="w-full h-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center text-md font-semibold text-slate-600 bg-teal-300 rounded-t-xl overflow-clip max-lg:flex-col max-lg:gap-2 max-lg:h-fit pr-8 lg:pr-16">
                                <p className="text-center w-full">Name</p>
                                <p className="text-center w-full">Email</p>
                                <p className="text-center w-full">
                                    Phone Number
                                </p>
                                <p className="text-center w-full ">Address</p>
                            </div>
                            {isCreatingContact && (
                                <div className="w-full flex items-center justify-center gap-10 border border-b-gray-100 px-4 max-lg:flex-col max-lg:gap-0">
                                    <CreateContact
                                        onContactAdded={handleContactAdded}
                                        closeInputField={() =>
                                            setIsCreatingContact(false)
                                        }
                                    />
                                </div>
                            )}
                            {/* List */}
                            {contacts.length == 0 && (
                                <p>No contacts saved...</p>
                            )}
                            {contacts
                                .filter(
                                    (contact) =>
                                        contact.name
                                            .toLowerCase()
                                            .includes(
                                                searchQuery.toLowerCase()
                                            ) ||
                                        contact.email
                                            .toLowerCase()
                                            .includes(
                                                searchQuery.toLowerCase()
                                            ) ||
                                        contact.phone_number
                                            .toLowerCase()
                                            .includes(
                                                searchQuery.toLowerCase()
                                            ) ||
                                        contact?.address
                                            .toLowerCase()
                                            .includes(searchQuery.toLowerCase())
                                )
                                .map((contact, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex items-center justify-center gap-10 border border-b-gray-100 px-4 max-lg:flex-col max-lg:gap-0"
                                    >
                                        {editMode &&
                                        editedContact.id === contact.id ? (
                                            <CreateContact
                                                defaultContact={editedContact}
                                                closeInputField={() =>
                                                    setEditMode(false)
                                                }
                                                onContactAdded={
                                                    handleSaveContact
                                                }
                                            />
                                        ) : (
                                            <Contact
                                                contact={contact}
                                                handleDeleteContact={
                                                    handleDeleteContact
                                                }
                                                handleEditContact={
                                                    handleEditContact
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
