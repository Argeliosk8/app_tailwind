import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { LoginPage } from "../pages/login";
import { SignUp } from "../pages/signup"

function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))
    useEffect(()=>{
        setIsLoggedIn(localStorage.getItem("isLoggedIn"))
    }, [])

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