import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);


  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  async function getUserProfile() {
    const token=localStorage.getItem("token")
let data =await axios.get(`${BASE_URL}/users/profile-data`,{
    headers:{
        "Authorization": `Bearer ${token}`
    }
  
})
  console.log(data.data.data.user)
  setUserData(data.data.data.user)
}

useEffect(()=>{
if(token){
  getUserProfile()
}
},[token])

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;