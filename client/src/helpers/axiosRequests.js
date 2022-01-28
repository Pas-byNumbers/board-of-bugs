import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = `http://localhost:8000`;
axios.defaults.headers.post["Content-Type"] = "application/json";

const handleError = (message) => {
  console.log(message);
  const simplifiedError = JSON.parse(message.request.responseText)
  for (const errorFound in simplifiedError) {
    toast.error(`${errorFound}: ${simplifiedError[errorFound]}`)
  }
};
// axiosLogin
export const axiosLogin = (username, password) => {
  return axios
    .post(`/accounts/login/`, {
      username,
      password,
    })
    .catch(err => handleError(err.response));
};
//  axiosRegister
export const axiosRegister = (username, password, email) => {
  return axios
    .post(`/accounts/register/`, {
      username,
      password,
      email,
    })
    .catch(err => handleError(err));
};
// axiosRefresh
export const axiosRefreshToken = (refreshKey) => {
  axios.post(`/accounts/refresh/`, { refreshKey }).then();
};

// axiosGetUser
export const axiosGetUser = async (id, accessKey) => {
  try {
    const res = await axios.get(`/accounts/users/${id}`, {
      headers: { Authorization: `Bearer ${accessKey}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
