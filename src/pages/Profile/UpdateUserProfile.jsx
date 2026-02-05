import { useEffect, useState } from "react";
import api from "../../Library/api";
import PageLoader from "../../components/Loader/PageLoader";
import ProfileForm from "../../components/form/ProfileForm";

const UpdateUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me");
      if (res.data.status === "success") {
        setUser(res.data.data.user);
      }
    } catch (err) {
      console.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading || !user) return <PageLoader />;

  return (
    <div className="max-w-xl mx-auto">
      <ProfileForm
        user={user}
        allowRoleChange={user.role === "admin"}
        onSuccess={setUser}
      />
    </div>
  );
};

export default UpdateUserProfile;
;
