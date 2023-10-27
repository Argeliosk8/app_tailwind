import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const ContextWrapper = ({children})=> {
     /*Global States*/
    const [name, setName] = useState("Argelio Baca");
      
    /*Global Functions*/
    const changeName = (newName)=>{
        if(name === "Argelio Baca"){
            setName(newName)
        } else {
            setName("Argelio Baca")
        }
    }
    
    return (
        
        <AppContext.Provider value={{
            name, 
            changeName,
            }}>
            {children}
        </AppContext.Provider>
    )   
}