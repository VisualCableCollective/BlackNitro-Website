export function Tab({title, children, defaultActive = false}) {
    return (
        <div className="py-6">
            {children}
        </div>
    )
}