import React from "react";
import authService from "../../appwrite/auth";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()));
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;