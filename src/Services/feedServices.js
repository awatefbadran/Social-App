import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function feedApi() {
    const token=localStorage.getItem("token")
let data =await axios.get(`${BASE_URL}/posts/feed?only=following&limit=10`,{
    headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
}

})
return data;
}
