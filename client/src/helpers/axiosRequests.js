import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = `http://localhost:8000`;
axios.defaults.headers.post["Content-Type"] = "application/json";

const handleRequestError = (message) => {
  console.log(message.request);
  const errorMessage = JSON.parse(message.request.responseText);
  for (const errorFound in errorMessage) {
    toast.error(`${errorFound}: ${errorMessage[errorFound]}`);
  }
};
// axiosLogin
export const axiosLogin = (username, password) => {
  return axios
    .post(`/accounts/login/`, {
      username,
      password,
    })
    .catch((err) => handleRequestError(err.response));
};
//  axiosRegister
export const axiosRegister = (username, password, email) => {
  return axios
    .post(`/accounts/register/`, {
      username,
      password,
      email,
    })
    .catch((err) => handleRequestError(err));
};
// axiosRefresh
export const axiosRefreshToken = (refreshKey) => {
  return axios
    .post(`/accounts/refresh/`, { refresh: refreshKey })
    .catch((err) => handleRequestError(err));
};

// axiosGetUser
export const axiosGetUser = (id, accessKey) => {
  return axios
    .get(`/accounts/users/${id}/`, {
      headers: { Authorization: `Bearer ${accessKey}` },
    })
    .catch((err) => handleRequestError(err));
};

// axiosGetUsersIndex
export const axiosGetUsersIndex = (accessKey) => {
  return axios
    .get(`/accounts/users/`, {
      headers: { Authorization: `Bearer ${accessKey}` },
    })
    .catch((err) => handleRequestError(err));
};

// axiosGetProjects
export const axiosGetProjects = (accessKey) => {
  return axios
    .get(`/api/projects/`, {
      headers: { Authorization: `Bearer ${accessKey}` },
    })
    .catch((err) => handleRequestError(err));
};

// axiosCreateProject
export const axiosCreateProject = (formData, userId, accessKey) => {
  return axios
    .post(
      `/api/projects/`,
      {
        ...formData,
        user: userId
      },
      {
        headers: {
          Authorization: `Bearer ${accessKey}`,
        },
      }
    )
    .catch((err) => handleRequestError(err));
};
