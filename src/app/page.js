"use client";

import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <ContactForm />
            </main>
            <Footer />
        </>
    );
}
