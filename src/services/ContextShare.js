import React, { createContext, useState } from 'react'

export const addResponseContext= createContext()
export const editResponseContext= createContext()


function ContextShare({children}) {
    const [addUpdate,setAddUpdate] =useState("")
    const [editUpdate,setEditUpdate] =useState("")

  return (
    <>
      <editResponseContext.Provider value={{editUpdate,setEditUpdate}}>
        <addResponseContext.Provider value={{addUpdate,setAddUpdate}}>
          {children}
          </addResponseContext.Provider>
      </editResponseContext.Provider>
    </>
  )
}

export default ContextShare
