import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'

const AuthProtectedRouts = ({children}) => {
    const navigate=useNavigate()
//  const userToken=localStorage.getItem("token")
let{token}=useContext(AuthContext)
 useEffect(()=>{
    if(token){
        navigate("/")
    }
    },[token])
    return children
}

export default AuthProtectedRouts
