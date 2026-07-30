import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-8
        flex
        justify-between
        items-center
        border
        border-gray-100
        cursor-pointer
        transition-all
        duration-300
        hover:shadow-2xl
        hover:-translate-y-2
        hover:scale-105
      "
    >
      <div>
        <h4 className="text-gray-500 text-lg font-medium">
          {title}
        </h4>

        <h2 className="text-5xl font-bold text-gray-800 mt-3">
          {value}
        </h2>
      </div>

      <div
        className={`
          w-20
          h-20
          rounded-full
          flex
          justify-center
          items-center
          text-white
          text-4xl
          shadow-lg
          ${color}
        `}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;