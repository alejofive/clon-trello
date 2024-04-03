import { Column, Id, Task } from "@/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updataColumn: (id: Id, title: string) => void;

  createTask: (columnId: string | number) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;

  tasks: Task[];
}

const ColumnContainer = ({
  column,
  deleteColumn,
  updataColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) => {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-4 rounded-2xl shadow-sm bg-white/50 min-w-[375px] h-[500px] max-h-[500px] flex flex-col border-2 opacity-40 overflow-hidden"
      ></div>
    );
  }

  console.log(tasks);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 rounded-2xl shadow-sm bg-white/50 min-w-[375px] h-[500px] min-h-[500px] flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="flex items-center justify-between h-[60px]"
      >
        <div className="flex items-center text-xl font-bold text-white">
          {!editMode && column.title}
          {editMode && (
            <input
              className="py-1 px-2 text-black rounded"
              value={column.title}
              onChange={(e) => updataColumn(column.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="hover:bg-white/50 rounded px-1 py-2 text-red-600"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      {/* tareas */}
      <div className="flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto text-bold">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      <Button
        color="primary"
        onClick={() => createTask(column.id)}
        className="bg-blue-600 text-white flex px-5 py-2 rounded-xl font-bold min-h-10"
      >
        <PlusCircleIcon className="w-7 mr-2" />
        Add Task
      </Button>
    </div>
  );
};

export default ColumnContainer;
