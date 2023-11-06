import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@taskbrew/prisma/db";
import {
  UpdateTaskBody,
  updateTask,
} from "@taskbrew/server-actions/update-task";
import { useState } from "react";
import toast from "react-hot-toast";
import { DueDatePopover } from "../due-date-popover";
import { DurationMenu } from "../duration-menu";
import { EditableTitle } from "../editable-title";
import { IconHolder } from "../icons";

type Props = {
  task: Task;
  className?: string;
};

export function TaskBoardItem(props: Props) {
  const [optimisticTask, setOptimisticTask] = useState(props.task);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.task.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onUpdateTask = (body: UpdateTaskBody) => {
    toast
      .promise(updateTask(props.task.id, body), {
        loading: "Updating task...",
        success: "Task updated!",
        error: "Failed to update task",
      })
      .catch(() => {
        setOptimisticTask(props.task);
      });
  };

  return (
    <div
      className={`cursor-default space-y-1 rounded-md bg-neutral-50 p-2 shadow-md dark:bg-neutral-950 ${props.className}`}
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <div className="flex items-center justify-between">
        <EditableTitle
          title={optimisticTask.title}
          onTitleChanged={(title) => {
            setOptimisticTask((prev) => ({ ...prev, title }));
            onUpdateTask({ title });
          }}
        />
        <button
          {...listeners}
          className="cursor-move rounded-md p-1 transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700"
        >
          <IconHolder className="h-3 w-3" />
        </button>
      </div>
      <div className="flex gap-1">
        <DueDatePopover
          dueDate={optimisticTask.dueDate}
          onDueDateChanged={(dueDate) => {
            setOptimisticTask((prev) => ({ ...prev, dueDate }));
            onUpdateTask({ dueDate });
          }}
        />
        <DurationMenu
          duration={optimisticTask.duration}
          onDurationChanged={(duration) => {
            setOptimisticTask((prev) => ({ ...prev, duration }));
            onUpdateTask({ duration });
          }}
        />
      </div>
    </div>
  );
}