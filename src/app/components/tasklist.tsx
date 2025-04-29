import { prismaClient } from "@/app/lib/prisma";
import UpdateTask from "@/app/components/updatetask";

export default async function TasksList() {
  const tasks = await prismaClient.task.findMany();

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
        {tasks.map(({ title, description, status }, index) => (
          <tr className="odd:bg-slate-900" key={index}>
            <td className="overflow-hidden text-ellipsis">{title}</td>
            <td className="overflow-hidden text-ellipsis">{description}</td>
            <td className="text-center overflow-hidden text-ellipsis">
              {status}
            </td>
            <td className="flex justify-center gap-2">
              <UpdateTask taskId="asd" />
              <button className="hover:cursor-pointer hover:bg-red-700 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
