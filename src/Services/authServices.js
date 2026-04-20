import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function registerApi(body) {
let data =await axios.post(`${BASE_URL}/users/signup`,body,{
    headers:{
        "Content-Type":"application/json"
}

})
return data;
}
export async function loginApi(body) {
let data =await axios.post(`${BASE_URL}/users/signin`,body,{
    headers:{
        "Content-Type":"application/json"
}

})
return data;
}
  

export const changePasswordApi = (data) => {
  return axios.patch(
    "https://route-posts.routemisr.com/users/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};