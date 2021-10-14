import MainLayout from "../MainLayout";
import {Sidebar} from "../../navigation/Sidebar";
import {MainNavbarSpacer} from "../../navigation/MainNavbar/MainNavbarSpacer";
import MainNavbar from "../../navigation/MainNavbar";

export function InternalLayout({children}) {
    return (
        <div>
            <MainNavbar />
            <div className="flex min-h-screen h-full w-full min-w-screen">
                <Sidebar />
                <div className="w-full flex justify-center" style={{paddingTop: '84px'}}>
                    <div className="m-6 max-w-6xl w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}