import Link from 'next/link'
import MainLayout from "../components/layouts/MainLayout";
import Particles from 'react-particles-js';

// images

export default function Home() {
    return (
        <MainLayout enableNavbarSpacing={false}>
            <div className="bg-no-repeat bg-center bg-cover text-white flex items-center justify-center"
                 style={{ height: "80vh"}}>
                <Particles
                    className={"relative h-full w-full"}
                    params={{
                        "particles": {
                            "number": {
                                "value": 160,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": 10,
                                "random": true
                            },
                            "move": {
                                "direction": "bottom",
                                "out_mode": "out"
                            },
                            "line_linked": {
                                "enable": false
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onclick": {
                                    "enable": false,
                                    "mode": "remove"
                                }
                            },
                            "modes": {
                                "remove": {
                                    "particles_nb": 10
                                }
                            }
                        }
                    }} />
                <h1 className="absolute uppercase text-6xl font-bold">A dream making studio</h1>
            </div>
        </MainLayout>
    )
}
