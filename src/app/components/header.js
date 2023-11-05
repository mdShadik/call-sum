import React from 'react';
import Link from "next/link";

function Header() {
    return (
        <nav className="border-b-2 border-b-cyan-800 px-4 lg:px-6 py-6 bg-cyan-950 bg-opacity-60 ">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link href="/" className="flex items-center">

                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white"><span className='text-2xl'>📞</span> Call Summarizer</span>
                </Link>
            </div>
        </nav>
    );
}

export default Header;