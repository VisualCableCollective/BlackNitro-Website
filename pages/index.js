import Link from 'next/link'
import MainLayout from "../components/layouts/MainLayout";

// images

export default function Home() {
    return (
        <MainLayout enableNavbarSpacing={false}>
            <div className="bg-no-repeat bg-center bg-cover text-white flex items-center justify-center"
                 style={{backgroundImage: "url(/assets/header-studio.jpg)", height: "80vh"}}>
                <h1 className="uppercase text-6xl font-bold">A dream making studio</h1>
            </div>
        </MainLayout>
    )
}
