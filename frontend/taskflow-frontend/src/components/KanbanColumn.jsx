import { Droppable } from "@hello-pangea/dnd";
import KanbanTaskCard from "./KanbanTaskCard";

const KanbanColumn = ({
  title,
  tasks,
  bgColor,
  droppableId,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">

      <div className={`${bgColor} text-white rounded-lg py-3 mb-5`}>
        <h2 className="text-center text-lg font-bold">
          {title} ({tasks.length})
        </h2>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[450px] space-y-4"
          >
            {tasks.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                No Tasks
              </div>
            ) : (
              tasks.map((task, index) => (
                <KanbanTaskCard
                  key={task._id}
                  task={task}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  );
};

export default KanbanColumn;