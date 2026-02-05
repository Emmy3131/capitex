import { useState } from "react";
import api from "../Library/api";

const UserInfo = ({ isMobile = false }) => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/me");
      if (res.data.status === "success") {
        setUser(res.data.data.user);
      }
    } catch (err) {
      console.error("Failed to load user");
    }
  };

  useState(() => {
    fetchUser();
  }, []);

 

  return (
    <div
      className={`flex items-center gap-3 ${
        isMobile ? "" : "p-4 border-b"
      }`}
    >
      <div className="leading-tight">
        <p className="text-sm text-emerald-600">Welcome back 👋</p>
        <h4 className="font-semibold text-[12px] text-gray-400">
          {user.name || user.email}
        </h4>
      </div>
    </div>
  );
};

export default UserInfo;
