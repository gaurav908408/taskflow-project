import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      p-6
      flex
      justify-between
      items-center
      hover:shadow-lg
      transition-all
      "
    >
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div
        className={`
        w-14
        h-14
        rounded-full
        flex
        justify-center
        items-center
        text-white
        text-2xl
        ${color}
        `}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;