import {CommonButton} from "./CommonButton";

export function SuccessButton({children, href, onClick, disabled, className}) {
    return (
        <CommonButton className={className}
                      customColor="bg-green-600 hover:bg-green-500"
                      disabledStyle="disabled:bg-green-800 disabled:text-opacity-70 text-white"
                      disabled={disabled}
                      onClick={onClick}
                      href={href}>
            {children}
        </CommonButton>
    )
}