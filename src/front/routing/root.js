import React from "react";
import { Outlet } from "react-router";
import { NavBar } from "../components/navbar.jsx";


function Root() {
    return(
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Root;