import React, { createContext, useEffect, useState } from 'react'

export const tokenAuthContext=createContext()

function AuthContext({children}) {
    const [isAuth,setIsAuth]=useState(false)

    useEffect(()=>{
       if (localStorage.getItem('token')){
        setIsAuth(true)
       }
       else{
        setIsAuth(false)
       }
    },[isAuth])

  return (
    <div>
      <tokenAuthContext.Provider value={{isAuth,setIsAuth}}>
        {children}
      </tokenAuthContext.Provider>
    </div>
  )
}

export default AuthContext
