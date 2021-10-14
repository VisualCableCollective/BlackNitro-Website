import Link from "next/link";

export function CommonButton({children, className, customColor = "", onClick, href = "", disabled = false, disabledStyle = ""}) {
    let color = "hover:bg-blue-500 bg-blue-600";

    if(customColor !== "") {
         color = customColor;
    }

    if (disabledStyle === "") {
        disabledStyle = "disabled:bg-blue-800 disabled:text-opacity-70 text-white";
    }

    if (href) {
        return (
            <Link href={href}>
                <a className={"rounded py-2 px-4 " + color + " " + className + " " + disabledStyle}>
                    {children}
                </a>
            </Link>
        )
    }

    return (
        <button className={"rounded py-2 px-4 " + color + " " + className + " " + disabledStyle} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}