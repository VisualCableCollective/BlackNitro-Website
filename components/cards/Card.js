export function Card({children, className = ""}) {
    return (
        <div className={"bg-dark-4 rounded px-6 py-4 " + className}>
            {children}
        </div>
    )
}