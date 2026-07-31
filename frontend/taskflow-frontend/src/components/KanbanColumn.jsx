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
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col h-full">

      <div className={`${bgColor} text-white rounded-xl py-2.5 px-4 mb-4 flex items-center justify-between shadow-sm`}>
        <h2 className="text-sm font-bold tracking-wide">
          {title}
        </h2>
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[420px] space-y-3 p-1 rounded-xl transition ${
              snapshot.isDraggingOver ? "bg-emerald-50/50 border-2 border-dashed border-emerald-300" : ""
            }`}
          >
            {tasks.length === 0 ? (
              <div className="text-center text-slate-400 text-xs py-12 border-2 border-dashed border-slate-200 rounded-xl">
                Drop tasks here
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