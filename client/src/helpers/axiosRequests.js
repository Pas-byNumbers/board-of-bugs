import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = `http://localhost:8000`;
axios.defaults.headers.post["Content-Type"] = "application/json";

const handleError = (message) => {
  console.log(message);
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
    .catch((err) => handleError(err.response));
};
//  axiosRegister
export const axiosRegister = (username, password, email) => {
  return axios
    .post(`/accounts/register/`, {
      username,
      password,
      email,
    })
    .catch((err) => handleError(err));
};
// axiosRefresh
export const axiosRefreshToken = (refreshKey) => {
  return axios
    .post(`/accounts/refresh/`, { refreshKey })
    .catch((err) => handleError(err));
};

// axiosGetUser
export const axiosGetUser = (id, accessKey) => {
  return axios
    .get(`/accounts/users/${id}/`, {
      headers: { Authorization: `Bearer ${accessKey}` },
    })
    .catch((err) => handleError(err));
};

// axiosGetUsersIndex
export const axiosGetUsersIndex = (accessKey) => {
  return axios
    .get(`/accounts/users/`, {
      headers: { Authorization: `Bearer ${accessKey}` },
    })
    .catch((err) => handleError(err));
};

// axiosGetProjects
export const axiosGetProjects = (accessKey) => {
  return axios
    .get(`/api/projects/`, {
      headers: { Authorization: `Bearer ${accessKey}` },
    })
    .catch((err) => handleError(err));
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
    .catch((err) => handleError(err));
};
