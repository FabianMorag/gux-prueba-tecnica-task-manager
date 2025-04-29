import { prismaClient } from "@/app/lib/prisma";
import UpdateTask from "@/app/components/updatetask";
import DeleteTask from "@/app/components/deletetask";

export default async function TasksList() {
  const tasks = await prismaClient.task.findMany();
  console.log(tasks);

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
        {tasks.map(({ id, title, description, status }, index) => (
          <tr className="odd:bg-slate-900" key={index}>
            <td className="overflow-hidden text-ellipsis">{title}</td>
            <td className="overflow-hidden text-ellipsis">{description}</td>
            <td className="text-center overflow-hidden text-ellipsis">
              {status}
            </td>
            <td className="flex justify-center gap-2">
              <UpdateTask taskId={id} />
              <DeleteTask taskId={id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
