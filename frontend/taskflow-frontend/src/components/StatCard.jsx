import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        border
        border-gray-100
        flex
        flex-col
        items-center
        justify-center
        text-center
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        min-h-[250px]
      "
    >
      {/* Icon */}
      <div
        className={`
          w-24
          h-24
          rounded-full
          flex
          items-center
          justify-center
          text-white
          text-5xl
          shadow-lg
          ${color}
        `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-2xl font-semibold text-gray-700">
        {title}
      </h3>

      {/* Value */}
      <h2 className="mt-4 text-5xl font-bold text-gray-900">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;