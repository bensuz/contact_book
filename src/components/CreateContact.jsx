"use client";

import { useState } from "react";
import { TfiSave } from "react-icons/tfi";
import { CgCloseR } from "react-icons/cg";
// Google Address Auto Complete
import Autocomplete from "react-google-autocomplete";
// International Phone Input
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
const phoneUtil = PhoneNumberUtil.getInstance();

const CreateContact = ({ onContactAdded, closeInputField, defaultContact }) => {
    const [name, setName] = useState(defaultContact?.name || "");
    const [email, setEmail] = useState(defaultContact?.email || "");
    const [phoneNumber, setPhoneNumber] = useState(
        defaultContact?.phone_number || ""
    );
    const [address, setAddress] = useState(defaultContact?.address || "");
    const [errorMessage, setErrorMessage] = useState("");

    const sendContactToPg = (e) => {
        e.preventDefault();
        if (name.trim() === "") {
            setErrorMessage("Please enter a valid name.");
        } else if (!isValidEmail(email)) {
            setErrorMessage("Please enter a valid email.");
        } else if (!isValidPhoneNumber(phoneNumber)) {
            setErrorMessage("Please enter a valid phone number.");
        } else {
            setErrorMessage("");
            onContactAdded({ name, email, address, phone_number: phoneNumber });
        }
    };

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    function isValidPhoneNumber(phone) {
        try {
            return phoneUtil.isValidNumber(
                phoneUtil.parseAndKeepRawInput(phone)
            );
        } catch (error) {
            return false;
        }
    }
    return (
        <div className="flex flex-col items-center justify-between gap-4 min-h-fit w-full px-2 py-4">
            {errorMessage && (
                <div className="text-red-600 font-medium ">{errorMessage}</div>
            )}
            <form
                className="w-full flex items-center justify-center max-lg:flex-col gap-4"
                onSubmit={sendContactToPg}
            >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-teal-500 rounded-md w-full px-2 h-9"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-teal-500 rounded-md w-full px-2 h-9"
                    />
                    <PhoneInput
                        defaultCountry="gb"
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                        inputClassName="flex-1"
                        className="border rounded-md border-teal-500 w-full flex"
                    ></PhoneInput>
                    <Autocomplete
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                        onPlaceSelected={(place) => {
                            setAddress(place?.formatted_address || place?.name);
                        }}
                        onChange={(e) => setAddress(e.target.value)}
                        defaultValue={address}
                        options={{
                            types: ["address"],
                        }}
                        className="border border-teal-500 rounded-md w-full px-2 h-9"
                    />
                </div>
                <div className="flex items-center justify-center gap-4 ml-4 max-[1400px]:flex-col max-lg:flex-row">
                    <button
                        type="submit"
                        className="text-teal-600 text-xl flex items-center justify-center"
                    >
                        <TfiSave />
                    </button>
                    <button
                        onClick={closeInputField}
                        className="text-teal-500 text-2xl font-thin flex items-center justify-center"
                    >
                        <CgCloseR />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateContact;
