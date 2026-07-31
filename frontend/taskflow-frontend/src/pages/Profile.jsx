import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getMe } from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }
    return (
    <center>
    <Layout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-5">
            {user?.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="border rounded-xl p-5">
            <h3 className="font-semibold text-gray-700 mb-2">
              Full Name
            </h3>

            <p>{user?.name}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="font-semibold text-gray-700 mb-2">
              Email Address
            </h3>

            <p>{user?.email}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="font-semibold text-gray-700 mb-2">
              Account Created
            </h3>

            <p>
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="font-semibold text-gray-700 mb-2">
              User ID
            </h3>

            <p className="break-all text-sm">
              {user?._id}
            </p>
          </div>

        </div>

      </div>
    </Layout>
    </center>

  );
};

export default Profile;