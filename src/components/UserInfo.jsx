import { useState } from "react";
import axios from "axios";

const UserInfo = ({ isMobile = false }) => {
  const activeUser = localStorage.getItem("user");
 const user = activeUser ? JSON.parse(activeUser) : {};

 

  return (
    <div
      className={`flex items-center gap-3 ${
        isMobile ? "" : "p-4 border-b"
      }`}
    >
      <img
        src={user.photo || "/avatar.png"}
        alt="User"
        className="w-8 h-8 lg:w-12 lg:h-12 rounded-full object-cover"
      />

      <div className="leading-tight">
        <p className="text-sm text-emerald-600">Welcome back 👋</p>
        <h4 className="font-semibold text-[12px] text-gray-800">
          {user.name || user.email || "User"}
        </h4>
      </div>
    </div>
  );
};

export default UserInfo;
