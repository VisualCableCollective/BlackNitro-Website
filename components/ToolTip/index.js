import ReactTooltip from "react-tooltip";
import {useEffect, useState} from "react";

export function ToolTip({effect, type, place}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (isMounted) {
        return <ReactTooltip effect={effect} type={type} place={place} />;
    }

    return "";
}