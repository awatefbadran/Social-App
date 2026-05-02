import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export async function postsApi() {
  const token = localStorage.getItem("token");

  let data = await axios.get(`${BASE_URL}/posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function savedpostes() {
  const token = localStorage.getItem("token");

  let data = await axios.get(`${BASE_URL}/users/bookmarks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}


export async function uploadPhotoApi(formData) {
  const token = localStorage.getItem("token");

  let data = await axios.put(
    `${BASE_URL}/users/upload-photo`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
 
      },
    }
  );

  return data;
}


export async function getMeApi() {
  const token = localStorage.getItem("token");

  let data = await axios.get(`${BASE_URL}/users/profile-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
export async function singlePostsApi(id) {
    const token=localStorage.getItem("token")
let data =await axios.get(`${BASE_URL}/posts/${id}`,{
    headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
}

})
return data;
}

export async function createPost(formData) {
    const token=localStorage.getItem("token")
let data =await axios.post(`${BASE_URL}/posts`,formData,{
    headers:{
        "Authorization": `Bearer ${token}`
}

})
return data;
}
export async function suggestions(limit = 5) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/users/suggestions?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export function likePost(postId) {
  const token = localStorage.getItem("token");

  return axios.put(
    `${BASE_URL}/posts/${postId}/like`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );
}