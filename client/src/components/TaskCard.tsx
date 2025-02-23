import { Task } from "@/state/api";
import { format } from "date-fns";
import { MessageSquareMore } from "lucide-react"; // Import the comment icon

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;
  console.log(task.id, task.comments);
  const PriorityTag = ({ priority }: { priority: Task["priority"] }) => (
    <div
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
          ? "bg-yellow-200 text-yellow-700"
          : priority === "Medium"
          ? "bg-green-200 text-green-700"
          : priority === "Low"
          ? "bg-blue-200 text-blue-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  // Defining valid statuses with reduced opacity
  const statusColor: Record<string, string> = {
    "To Do": "bg-blue-500 bg-opacity-50",
    "Work In Progress": "bg-green-500 bg-opacity-50",
    "Under Review": "bg-yellow-500 bg-opacity-50",
    Completed: "bg-gray-500 bg-opacity-50",
  };

  // Fallback to a default color with reduced opacity if task.status is undefined or invalid
  const statusClass = statusColor[task.status as keyof typeof statusColor] || "bg-gray-200 bg-opacity-50";

  // Add conditional text color based on theme
  const statusTextColor = "text-gray-800 dark:text-white";

  return (
    <div className="mb-4 rounded-md bg-white shadow-md dark:bg-dark-tertiary hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 md:p-6">
        {/* Task Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Priority */}
          {task.priority && <PriorityTag priority={task.priority} />}
        </div>

        {/* Task Title & Status */}
        <div className="my-3 flex justify-between">
          <h4 className="text-lg font-semibold dark:text-white">{task.title}</h4>
          {/* Task Status */}
          <div
            className={`text-xs font-semibold rounded-full px-3 py-1 ${statusClass} ${statusTextColor} flex items-center justify-center`}
          >
            {task.status}
          </div>
        </div>

        {/* Task Tags */}
        {task.tags && (
          <div className="text-xs text-gray-600 dark:text-neutral-400 mt-1">
            {task.tags.split(",").map((tag, index, array) => (
              <>
              {console.log(index)}
                <span key={index}>{tag.trim()}</span>
                {index < array.length - 1 && ", "}
              </>
            ))}
          </div>
        )}

        {/* Task Dates */}
        <div className="text-sm text-gray-500 dark:text-neutral-200 mt-2">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>

        {/* Task Description */}
        <div className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
          {task.description || "No description provided."}
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

        {/* Task Users (Author & Assignee Names) */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            {task.assignee && (
              <div className="text-sm font-semibold text-gray-800 dark:text-white">
                Assignee: {task.assignee.username}
              </div>
            )}
            {task.author && (
              <div className="text-sm font-semibold text-gray-800 dark:text-white">
                Author: {task.author.username}
              </div>
            )}
          </div>

          {/* Comments Icon with Number */}
          <div className="flex items-center text-gray-500 dark:text-white">
            <MessageSquareMore className="size-5" /> {/* Comment Icon */}
            <span className="ml-2 text-sm dark:text-white">{numberOfComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
