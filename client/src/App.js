import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, PostUserForm } from "./components";
import { ProjectsContainer } from "./containers";
import {
  axiosLogin,
  axiosRegister,
  axiosRefreshToken,
} from "./helpers/axiosRequests";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  //  state -user-
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});

  const handleLogin = async (requestBody) => {
    const toastLoadLogin = toast.loading("Logging In...");
    const res = await axiosLogin(requestBody.username, requestBody.password);
    toast.dismiss(toastLoadLogin);
    if (res.data) {
      saveUserToState(res.data);
      toast.success("Successfully Logged In!");
    }
  };

  const handleLogout = () => {
    setUser({});
    setToken({});
    toast.success("You have Logged Out");
  };

  const handleRegister = async (requestBody) => {
    const toastLoadRegister = toast.loading("Registering your account...");
    const res = await axiosRegister(
      requestBody.username,
      requestBody.password,
      requestBody.email
    );
    toast.dismiss(toastLoadRegister);
    if (res.data) {
      saveUserToState(res.data);
      toast.success("Successfully Registered Account!");
    }
  };

  const saveUserToState = (payload) => {
    setUser(payload.user);
    setToken({
      access: payload.access,
      refresh: payload.refresh,
    });
  };

  const handleRecycleToken = async (token) => {
    if (token.refresh) {
      const res = await axiosRefreshToken(token.refresh);
      if (res.data) {
        setToken({
          ...token,
          access: res.data.access,
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleRecycleToken(token);
    }, 250000);
  }, [token]);

  return (
    <div className="App">
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleRecycleToken={handleRecycleToken}
      />
      <Routes>
        <Route
          path="/projects"
          element={<ProjectsContainer token={token} userId={user.id} />}
        />
        <Route
          path="/login"
          element={
            <PostUserForm
              handleRegister={handleRegister}
              handleLogin={handleLogin}
              formAction="login"
            />
          }
        />
        <Route
          path="/register"
          element={
            <PostUserForm
              handleRegister={handleRegister}
              handleLogin={handleLogin}
              formAction="register"
            />
          }
        />
        <Route path="/" />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
