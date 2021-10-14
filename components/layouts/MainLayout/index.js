import Link from 'next/link'
import MainNavbar from "../../navigation/MainNavbar";
import {MainNavbarSpacer} from "../../navigation/MainNavbar/MainNavbarSpacer";

export default function MainLayout({children, enableNavbarSpacing = true}) {
    return (
        <div>
            <MainNavbar />
            <div className="relative min-h-screen h-full">
                {enableNavbarSpacing === true ? <MainNavbarSpacer /> : ""}
                {children}
            </div>
        </div>
    )
}