export function Table({children}) {
    return (
        <table className="table table-auto border border-collapse w-full">
            {children}
        </table>
    );
}