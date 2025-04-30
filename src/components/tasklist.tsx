import { prismaClient } from "@/lib/prisma";
import UpdateTask from "@/components/updatetask";
import DeleteTask from "@/components/deletetask";
import { STATUS } from "@/constants";
import { Task } from "@prisma/client";

export default async function TasksList() {
  const tasks: Task[] = await prismaClient.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <table className="w-full table-fixed outline outline-slate-600 rounded-lg [&_td]:p-2 [&_th]:p-2">
      <thead>
        <tr className="border-b rounded-lg border-slate-600">
          <th className="text-left">Title</th>
          <th className="text-left overflow-hidden text-ellipsis">
            Description
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr className="odd:bg-slate-900" key={task.id}>
            <td className="overflow-hidden text-ellipsis">{task.title}</td>
            <td className="overflow-hidden text-ellipsis">
              {task.description}
            </td>
            <td className="text-center overflow-hidden text-ellipsis">
              <span
                style={{ backgroundColor: STATUS[task.status].color }}
                className="px-1 rounded-xl"
              >
                {" "}
                {STATUS[task.status].text}
              </span>
            </td>
            <td className="flex justify-center gap-2">
              <UpdateTask task={task} />
              <DeleteTask taskId={task.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
