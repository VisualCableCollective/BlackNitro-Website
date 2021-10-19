import MainLayout from "../../components/layouts/MainLayout";
import React from "react";

export default function JobPage() {
    return (
        <MainLayout>
            <div className="hero bg-center bg-cover" style={{backgroundImage: "url(https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3)", height: "40vh"}}>
                <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
                    <div>
                        <h2 className="pb-6 uppercase font-medium">Business Development</h2>
                        <h1 className="uppercase text-6xl font-bold">Head Of Strategic Platform Partnerships</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className={"m-6 max-w-6xl w-full"}>
                    <h2 className="text-2xl font-bold my-6">What you'll be doing</h2>
                    <ul className="list-disc list-outside pl-5">
                        <li className="align-baseline">Navigate and cultivate relationships with key stakeholders and decision makers at leading global technology platform companies (ie. Microsoft, Google, Apple, Sony, Amazon)</li>
                        <li>Navigate and cultivate relationships with key stakeholders and decision makers at leading global technology platform companies (ie. Microsoft, Google, Apple, Sony, Amazon)</li>
                        <li>Navigate and cultivate relationships with key stakeholders and decision makers at leading global technology platform companies (ie. Microsoft, Google, Apple, Sony, Amazon)</li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    )
}