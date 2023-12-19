import React, { useState, createContext } from "react";


export const AppContext = createContext();

export const ContextWrapper = ({children})=> {
     /*Global States*/
    const [name, setName] = useState("Argelio Baca");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState()
    /*Global Functions*/
    const changeName = (newName)=>{
        if(name === "Argelio Baca"){
            setName(newName)
        } else {
            setName("Argelio Baca")
        }
    }

    const login = async (username, password) => {
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password})
            })
            if(!res.ok) throw Error("There was a problem with your login request")
            const data = await res.json()
            localStorage.setItem("jwt-token", data.token)
            localStorage.setItem("username", data.user.profile.first_name)
            localStorage.setItem("isLoggedIn", true)
            setIsLoggedIn(true)
            setUser(data.user)
            return `Login validated for user: ${username}`
        } catch (error) {
            console.log(error)
        }
    }
    
    const verifylogin = async () => {
        const tokenToVerify = localStorage.getItem("jwt-token")
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
                Authorization: 'bearer' + ' ' + tokenToVerify
            })

            if(!res.ok) throw Error("No token or unable to verify")
            const user = await res.json()
            setUser(user)
            setIsLoggedIn(true)
            return `Token validated for user: ${user.profile.first_name}`
        } catch (err) {
            
        }
    }

    return (
        
        <AppContext.Provider value={{
            name, 
            changeName,
            isLoggedIn,
            setIsLoggedIn,
            login,
            user,
            verifylogin
            }}>
            {children}
        </AppContext.Provider>
    )   
}