import { Id, Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useState } from "react";

interface Props {
  task: Task;
  deleteTask: (Id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white/45 rounded p-2.5 min-h-[100px] max-h-[100px] opacity-50"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white/45 rounded p-2.5 min-h-[100px] max-h-[400px] items-center flex text-left cursor-grab relative shadow-md"
      >
        <textarea
          className="w-full h-[90%] resize-none border-none rounded bg-transparent text-black p-2"
          value={task.content}
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-white/45 rounded p-2.5 h-[100px] min-h-[100px] items-center flex text-left cursor-grab relative"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-hidden overflow-x-auto whitespace-pre-wrap ">
        {task.content}
      </p>
      {mouseIsOver && (
        <Button
          color="primary"
          onClick={() => {
            deleteTask(task.id);
          }}
          className=" text-red-600 flex px-2 py-2 rounded-xl font-bold"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default TaskCard;
