import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, logoutUser } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Logged In User
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
const { data } = await getMe();  
    setUser(data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const login = async (formData) => {
    try {
      const { data } = await loginUser(formData);

      localStorage.setItem("token", data.token);

      setUser(data.user);

      toast.success("Login Successful");

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {}

    localStorage.removeItem("token");
    setUser(null);

    toast.success("Logged Out Successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loadUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;