import Link from 'next/link';

// Icon
import {MdDashboard} from 'react-icons/md';
import {FaServer} from 'react-icons/fa';
import {IoLogoGameControllerB, IoMdSettings} from 'react-icons/io';
import {HiUserGroup} from 'react-icons/hi';
import {ToolTip} from "../../ToolTip";
import {useRouter} from "next/router";

const DISABLED_FEATURE_NOT_AVAIL = "Feature not available yet";

export function Sidebar() {
    return (
        <ul className="border-r-2 border-dark-2 mt-6 w-96" style={{paddingTop: '84px'}}>
            <SidebarItem title={"Dashboard"} icon={<MdDashboard />} href="/internal/dashboard" />
            <SidebarItem title={"Servers"} icon={<FaServer />} disabled disabledInfo={DISABLED_FEATURE_NOT_AVAIL} />
            <SidebarItem title={"PlayTests"} icon={<IoLogoGameControllerB />} disabled disabledInfo={DISABLED_FEATURE_NOT_AVAIL} />
            <SidebarItem title={"User Management"} icon={<HiUserGroup />} href="/internal/users" />
            <SidebarItem title={"Settings"} icon={<IoMdSettings />} href="/internal/staff" />
        </ul>)
}

function SidebarItem({title, icon, href = "/internal/dashboard", disabled = false, disabledInfo = ""}) {
    let active = false;
    const router = useRouter();

    // disabled routes point to the same page to prevent errors
    if (router.pathname.includes(href) && !disabled) {
        active = true;
    }

    return (
        <li>
            <ToolTip effect="solid" type="dark" place="right" />
            <Link href={href}>
                <a data-tip={disabledInfo}
                   className={(active ? "bg-dark-4 text-opacity-100" : "text-opacity-70") + " rounded text-white flex items-center px-4 py-2 mx-6 mt-2 " + (disabled ? "opacity-70" : "hover:text-opacity-100 hover:bg-dark-5")}>
                    <div className="text-lg mr-6">{icon}</div>
                    <h1 className={"text-lg" + (disabled ? " line-through" : "")}>{title}</h1>
                </a>
            </Link>
        </li>
    )
}