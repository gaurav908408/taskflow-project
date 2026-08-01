import { useState, useEffect } from "react";
import { BACKEND_URL } from "../services/api";

const Avatar = ({ user, sizeClass = "w-9 h-9 text-sm", roundedClass = "rounded-xl", className = "" }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [user?.avatarUrl]);

  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  let avatarSrc = null;
  if (user?.avatarUrl) {
    if (user.avatarUrl.startsWith("http://") || user.avatarUrl.startsWith("https://")) {
      avatarSrc = user.avatarUrl;
    } else {
      avatarSrc = `${BACKEND_URL}${user.avatarUrl.startsWith("/") ? "" : "/"}${user.avatarUrl}`;
    }
  }

  if (avatarSrc && !imgError) {
    return (
      <img
        src={avatarSrc}
        alt={user?.name || "Profile"}
        onError={() => setImgError(true)}
        className={`${sizeClass} ${roundedClass} object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} ${roundedClass} bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center shadow-xs overflow-hidden select-none ${className}`}
    >
      {initial}
    </div>
  );
};

export default Avatar;
