export function Tab({title, children, defaultActive = false}) {
    return (
        <div className="pt-4">
            {children}
        </div>
    )
}