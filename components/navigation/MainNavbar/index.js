import Link from 'next/link'

export default function MainNavbar(props) {
    return (
        <div className="main-nav fixed top-0 z-10 w-full flex justify-between items-center px-14">
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
    )
}