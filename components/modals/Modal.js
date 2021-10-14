import {useEffect, useState} from "react";
import ReactModal from "react-responsive-modal";

export function Modal({title, description, children, closeModal, isOpen}) {
    return (
        <ReactModal open={isOpen} closeIcon={<div/>} onClose={closeModal} center classNames={{modal: "rounded bg-dark-4 text-white"}}>
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <p className={"mt-2"}>{description}</p>
            <div className="flex mt-4">
                {children}
            </div>
        </ReactModal>
    )
}