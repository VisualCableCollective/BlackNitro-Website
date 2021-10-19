export function Table({children, className = "border border-collapse"}) {
    return (
        <table className={"table table-auto w-full " + className}>
            {children}
        </table>
    );
}