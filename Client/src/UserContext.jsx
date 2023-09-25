import { createContext, useState } from "react";
import React from 'react'
export const UserContext = createContext({});
function UserContextProvider({children}) {
    const [info,setInfo] = useState(null);
    const [items,setItems] = useState([]);
  return (
    <UserContext.Provider value={{info,setInfo,items,setItems}}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider