const StatCard = ({ title, value, icon, color, trend }) => {
  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        shadow-sm
        hover:shadow-2xl
        hover:shadow-emerald-500/25
        border
        border-slate-200/80
        dark:border-slate-800
        p-6
        flex
        flex-col
        justify-between
        transform
        transition-all
        duration-300
        hover:-translate-y-3
        hover:scale-[1.02]
        hover:border-emerald-500
        dark:hover:border-emerald-400
        group
        cursor-pointer
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {value}
          </h2>
        </div>

        <div
          className={`
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            text-white
            text-xl
            shadow-md
            transform
            group-hover:scale-110
            group-hover:rotate-6
            transition-all
            duration-300
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;