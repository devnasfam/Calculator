import React, { useState, createContext } from 'react';

export const AppContext = createContext();
export const AppProvider = ({children}) =>{
const [value, setValue] = useState("0");
 const [equal, setEqual] = useState();
 const [isDark, setIsdark] = useState(true);
 const [Icon, setIcon] = useState("dark_mode");
 const [isBg, setIsBg] = useState(true);
 const Values = {
     value,setValue,
     equal,setEqual,
     isDark,setIsdark,
     Icon,setIcon,
     isBg,setIsBg
 }
    return(
       <AppContext.Provider value={Values}>
        {children}
       </AppContext.Provider>
    );
}
