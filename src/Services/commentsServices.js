import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAllComments(postID) {
    const token=localStorage.getItem("token")
let data =await axios.get(`${BASE_URL}/posts/${postID}/comments?page=1&limit=10`,{
    headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
}

})
return data;
}

export async function createComment(postID ,formData) {
    const token=localStorage.getItem("token")
let data =await axios.post(`${BASE_URL}/posts/${postID}/comments`,formData,{
    headers:{
        "Authorization": `Bearer ${token}`
}

})
return data;
}