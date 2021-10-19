import MainLayout from "../../components/layouts/MainLayout";
import {Grid} from "@mui/material";
import React from "react";
import Link from "next/link";
import {BsArrowRightSquareFill} from "react-icons/bs";

export default function JobsPage() {
    return (
        <MainLayout>
            <div className="hero bg-center bg-cover" style={{backgroundImage: "url(https://images.unsplash.com/photo-1527690789675-4ea7d8da4fe3)", height: "80vh"}}>
                <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
                    <div>
                        <h1 className="uppercase text-6xl font-bold">Are you ready for your next challenge?</h1>
                        <h1 className="text-center pt-2">We are currently looking for over 100 creative people.</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className={"m-6 max-w-6xl w-full"}>
                    <GridHeader />
                    <GridBody />
                </div>
            </div>
        </MainLayout>
    )
}



function GridRow({children, className = ""}) {
    return (
        <Grid container columns={10} columnSpacing={4} className={"py-6 " + className}>
            {children}
        </Grid>
    )
}

function GridHeader() {
    return (
        <GridRow className={"border-b-2"}>
            <GridItem highlighted xs={4}>
                Position
            </GridItem>
            <GridItem highlighted xs={4}>
                Department
            </GridItem>
        </GridRow>
    )
}

function GridItem({children, highlighted = false, xs}) {
    return (
        <Grid item xs={xs}>
            <div className={"h-full " + (highlighted ? "font-bold" : "")}>{children}</div>
        </Grid>
    )
}

function GridBody() {
    return (
        <Link href={"/"}>
            <a>
                <GridRow className={"border-b hover:bg-dark-5"}>
                    <GridItem highlighted xs={4}>
                        Gameplay Programmer
                    </GridItem>
                    <GridItem xs={4}>
                        Programming
                    </GridItem>
                    <GridItem xs={2}>
                        <div className={"h-full flex items-center justify-end text-xl"} style={{paddingRight: "32px"}}>
                            <BsArrowRightSquareFill />
                        </div>
                    </GridItem>
                </GridRow>
            </a>
        </Link>
    )
}
