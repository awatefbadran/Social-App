import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => localStorage.getItem("token");

export const getNotificationsApi = async (page = 1, limit = 10) => {
  const res = await axios.get(
    `${BASE_URL}/notifications?unread=false&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res;
};

export const getUnreadCountApi = async () => {
  const res = await axios.get(
    `${BASE_URL}/notifications/unread-count`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res;
};

export const readNotificationApi = async (id) => {
  const res = await axios.post(
    `${BASE_URL}/notifications/read`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res;
};

export const readAllNotificationsApi = async () => {
  const res = await axios.post(
    `${BASE_URL}/notifications/read-all`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res;
};