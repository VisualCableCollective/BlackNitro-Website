import Link from 'next/link'
import MainLayout from "../../components/layouts/MainLayout";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import {useState} from "react";
import {useRouter} from "next/router";

export default function Register() {
    const router = useRouter();

    const [isBackDropOpen, setIsBackDropOpen] = useState(false);
    const [alert, setAlert] = useState();

    async function handleSubmit(event) {
        event.preventDefault();

        await window.sessionStorage.setItem("wasRegistrationSuccessful", null);

        setAlert(null);
        setIsBackDropOpen(true);

        const res = await fetch(
            'http://localhost:8000/api/auth/register',
            {
                body: JSON.stringify({
                    name: event.target.name.value,
                    email: event.target.email.value,
                    password: event.target.password.value
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST'
            }
        )

        if (res.status !== 200) {
            if (res.status === 422) {
                const result = await res.json();
                setAlert(
                    <Alert severity="error" className={"mb-8"}>
                        {result.message}
                    </Alert>
                );
            } else {
                setAlert(
                    <Alert severity="error" className={"mb-8"}>
                        <AlertTitle>An unknown error occurred!</AlertTitle>
                        Please report this error and try again later.
                    </Alert>
                );
            }
            setIsBackDropOpen(false);
            return;
        }

        const result = await res.json();

        if (result.success) {
            await window.sessionStorage.setItem("wasRegistrationSuccessful", "true");
            await router.push("/auth/login");
        }
    }

    return (
        <MainLayout enableNavbarSpacing={false}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackDropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="bg-cover bg-login min-h-screen">
                <div className="bg-blur-max login-wrapper min-h-screen grid grid-cols-2 px-32">
                    <div className="flex items-center">
                        <div>
                            {alert}
                            <h1 className="text-2xl">Welcome at ArcticRoad Games!</h1>
                            <h1 className="text-opacity-50 text-white">Here you are able to create your own employee account</h1>
                            <form className="flex flex-col w-full mt-8" onSubmit={handleSubmit}>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       name="name"
                                       placeholder="Name"
                                       required/>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       name="email"
                                       placeholder="E-Mail"
                                       required/>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       type="password"
                                       name="password"
                                       placeholder="Password"
                                       required/>
                                <input className="h-14 mb-4 login-input py-3 px-4 rounded-lg focus-visible:outline-none"
                                       type="password"
                                       name="confirm_password"
                                       placeholder="Confirm Password"
                                       required/>
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