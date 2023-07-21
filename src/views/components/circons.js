import React from 'react'
import { getUserData } from '../../utility/Utils'

export default function Circons() {
    const userData =  getUserData()
  return (
        userData.role === "candidat" ? (
         <h3> <b> { userData.lib_circons} </b></h3> 
        ) : null
      
  )
}
