export function TableBodyCell({children, className = "border text-center"}) {
    return (
        <td className={"p-2 " + className}>{children}</td>
    )
}