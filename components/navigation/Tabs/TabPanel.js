import {Tab} from "./Tab";
import {useEffect, useState} from "react";

export function TabPanel({children}) {
    let buttons = [];
    let content;
    const [activeTabName, setActiveTabName] = useState("");

    function onTabButtonClick(tabName) {
        setActiveTabName(tabName);
    }

    children.forEach(tab => {
        if (tab.type.name === Tab.name) {
            let isTabActive = activeTabName === tab.props.title;

            if (!isTabActive && activeTabName === "" && tab.props.defaultActive) {
                isTabActive = true;
            }

            buttons.push(<TabButton key={tab.props.title} title={tab.props.title} onClick={onTabButtonClick} active={isTabActive} />);

            if(isTabActive) {
                content = tab;
            }
        }
    });

    return (
        <div>
            <nav className="tabs flex flex-col sm:flex-row">
                {buttons}
            </nav>
            {content}
        </div>
    )
}

function TabButton({title, active = false, onClick}) {

    return (
        <button onClick={() => onClick(title)} className={"tab text-white py-4 px-6 block hover:text-blue-400 focus:outline-none" + (active ? " text-blue-500 border-b-2 font-medium border-blue-500" : "")}>
            {title}
        </button>
    )
}