import Link from 'next/link'

// images

export default function Home() {
    return (
        <div>
            <div className="main-nav fixed w-full flex justify-between items-center px-14">
                <div>
                    ArcticRoad Games
                </div>
                <ul className="flex-wrap flex-row flex ">
                    <li className="flex relative center">
                        <Link href="/">
                            <a className="main-nav-item h-full relative px-6 py-8 text-sm font-bold uppercase">
                                Home
                            </a>
                        </Link>
                    </li>
                    <li className="flex relative center">
                        <Link href="/">
                            <a className="main-nav-item h-full relative px-6 py-8 text-sm font-bold uppercase">
                                Black Nitro
                            </a>
                        </Link>
                    </li>
                    <li className="flex relative center">
                        <Link href="/">
                            <a className="main-nav-item h-full relative px-6 py-8 text-sm font-bold uppercase">
                                Jobs
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="bg-no-repeat bg-center bg-cover text-white flex items-center justify-center"
                 style={{backgroundImage: "url(/assets/header-studio.jpg)", height: "80vh"}}>
                <h1 className="uppercase text-6xl font-bold">A dream making studio</h1>
            </div>
        </div>
    )
}
