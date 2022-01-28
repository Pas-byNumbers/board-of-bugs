import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, PostUserForm } from "./components";
import { axiosLogin, axiosRegister } from "./helpers/axiosRequests";
import toast, { Toaster } from "react-hot-toast";

function App() {
  //  state -user-
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});

  const handleLogin = async (requestBody) => {
    const loadLogin = toast.loading("Logging In...");
    const res = await axiosLogin(requestBody.username, requestBody.password);
    toast.dismiss(loadLogin);
    if (res.data) {
      saveUserToState(res.data);
      toast.success("Successfully Logged In!");
    }
  };

  const handleRegister = async (requestBody) => {
    const loadRegister = toast.loading("Registering your account...");
    const res = await axiosRegister(
      requestBody.username,
      requestBody.password,
      requestBody.email
    );
    toast.dismiss(loadRegister);
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

  return (
    <div className="App">
      <header className="App-header"></header>
      <Navbar />
      <Routes>
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
