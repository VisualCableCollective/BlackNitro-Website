export function TableHeadCell({children, className = "border text-center"}) {
    return (
        <th className={"p-2 "  + className}>{children}</th>
    )
}