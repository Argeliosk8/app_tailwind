import React, { useContext } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LoginPage } from "../pages/login";
import { AppContext } from "../context/ContextWrapper";

function Root() {
    const {isLoggedIn} = useContext(AppContext)
    return(
        <div>
            {
                isLoggedIn ? (
                    <>
                    <NavBar />
                    <Outlet />
                    <Footer />
                    </>
                ):(
                    <LoginPage />
                )
            }
        </div>
    )
}

export default Root;