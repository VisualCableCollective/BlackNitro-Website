import {CommonButton} from "./CommonButton";

export function DangerButton({children, href, onClick, disabled, className}) {
    return (
        <CommonButton className={className}
                      customColor="bg-red-600 hover:bg-red-500"
                      disabledStyle="disabled:bg-red-800 disabled:text-opacity-70 text-white"
                      disabled={disabled}
                      onClick={onClick}
                      href={href}>
            {children}
        </CommonButton>
    )
}