import React from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";

function Modal({
                   show,
                   setShow = i => false,
                   children
               }) {


    if (!show) {
        return <></>
    }

    return (
        <div onClick={() => {
            setShow(false)
        }}
             className={"fixed inset-0 w-screen h-screen overflow-y-auto p-3 sm:px-16 bg-black/20 backdrop-blur-sm z-50"}>

            <div
                className={"bg-gray-800 rounded shadow relative flex items-center justify-center min-h-screen my-12 container mx-auto"}
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                <XMarkIcon onClick={() => setShow(false)}
                           className={"absolute cursor-pointer z-50 top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 text-cyan-50"}/>
                {children}
            </div>
        </div>
    );
}

export default Modal;