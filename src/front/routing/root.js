import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import { Footer } from "../components/Footer";

function Root() {
    return(
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Root;