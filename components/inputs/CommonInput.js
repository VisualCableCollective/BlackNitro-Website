export function CommonInput({name, placeholder, className = ""}) {
    return (
        <input className={"h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none " + className}
               name={name}
               placeholder={placeholder}/>
    )
}