import {useEffect, useState} from "react";
import ReactModal from "react-responsive-modal";

export function Modal({title, description, children, closeModal, isOpen, className = ""}) {
    return (
        <ReactModal open={isOpen} closeIcon={<div/>} onClose={closeModal} center classNames={{modal: "rounded bg-dark-4 text-white " + className}}>
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <p className={"mt-2"}>{description}</p>
            <div className="mt-4 w-full">
                {children}
            </div>
        </ReactModal>
    )
}