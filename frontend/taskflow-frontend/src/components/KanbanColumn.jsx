import KanbanTaskCard from "./KanbanTaskCard";

const KanbanColumn = ({
  title,
  tasks,
  bgColor,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">

      <div className={`${bgColor} text-white rounded-lg py-3 mb-5`}>
        <h2 className="text-center text-lg font-bold">
          {title}
        </h2>
      </div>

      <div className="space-y-4">

        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">
            No Tasks
          </p>
        ) : (
          tasks.map((task) => (
            <KanbanTaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

      </div>

    </div>
  );
};

export default KanbanColumn;