import Link from 'next/link'
import MainLayout from "../../components/layouts/MainLayout";

export default function Register() {
    async function handleSubmit(event) {
        event.preventDefault();

        const res = await fetch(
            'http://localhost:8000/api/auth/register',
            {
                body: JSON.stringify({
                    name: event.target.name.value,
                    email: event.target.email.value,
                    password: event.target.password.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json();
        console.log(result);
    }

    return (
        <MainLayout enableNavbarSpacing={false}>
            <div className="bg-cover bg-login min-h-screen">
                <div className="bg-blur-max login-wrapper min-h-screen grid grid-cols-2 px-32">
                    <div className="flex items-center">
                        <div>
                            <h1 className="text-2xl">Welcome at ArcticRoad Games!</h1>
                            <h1 className="text-opacity-50 text-white">Here you are able to create your own employee account</h1>
                            <form className="flex flex-col w-full mt-8" onSubmit={handleSubmit}>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       name="name"
                                       placeholder="Name"/>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       name="email"
                                       placeholder="E-Mail"/>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       type="password"
                                       name="password"
                                       placeholder="Password"/>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       type="password"
                                       name="confirm_password"
                                       placeholder="Confirm Password"/>
                                <div className="mt-4">
                                    <input className="bg-white text-black rounded-lg py-2 px-4 text-md" type="submit" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}