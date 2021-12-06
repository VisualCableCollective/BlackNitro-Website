import Link from 'next/link'
import MainLayout from "../../components/layouts/MainLayout";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import {useState} from "react";
import {Alert, AlertTitle} from "@mui/material";

export default function Login() {
    const router = useRouter();

    const [alert, setAlert] = useState();

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await fetch(
            'http://localhost:8000/oauth/token',
            {
                body: JSON.stringify({
                    grant_type: "password",
                    client_id: 3,
                    client_secret: "13M4uaytF5B0A49kDbniesPNnelx0jrg62ZHdszH",
                    username: event.target.email.value,
                    password: event.target.password.value,
                    scope: '*'
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        if (res.status !== 200) {
            if (res.status === 500) {
                setAlert(
                    <Alert severity="error">
                        <AlertTitle>An unknown error occurred!</AlertTitle>
                        Please report this error and try again later.
                    </Alert>
                );
            }

            // show error
            return;
        }

        const result = await res.json();

        localStorage.setItem("accessToken", result.access_token);
        localStorage.setItem("refreshToken", result.refresh_token);

        const cookies = new Cookies();
        await cookies.set("access_token", result.access_token, {path: '/'});

        await router.push('/internal/dashboard');
    }

    return (
        <MainLayout enableNavbarSpacing={false}>
            <div className="bg-cover bg-login min-h-screen">
                <div className="bg-blur-max login-wrapper min-h-screen grid grid-cols-2 px-32">
                    <div className="flex items-center">
                        <div>
                            {alert}
                            <h1 className="text-2xl mt-8">Welcome back!</h1>
                            <h1 className="text-opacity-50 text-white">Sign in to your <span className="text-opacity-100 text-white">ArcticRoad Games</span> employee account</h1>
                            <form className="flex flex-col w-full mt-8" onSubmit={handleSubmit}>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       name="email"
                                       placeholder="E-Mail"/>
                                <input className="h-14 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       type="password"
                                       name="password"
                                       placeholder="Password"/>
                                <div className="mt-8">
                                    <a className="text-white text-opacity-60 hover:text-opacity-100 pr-4 border-r-2 border-gray-500 text-md" type="submit" href={"/"}>
                                        Forgot Password
                                    </a>
                                    <input className="bg-white text-black rounded-lg py-2 mx-4 px-4 text-md cursor-pointer" type="submit" value="Sign In" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}