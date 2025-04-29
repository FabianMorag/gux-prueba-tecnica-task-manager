"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createTaskFormSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { STATUS } from "@/app/constants";

export default function CreateTask() {
  const [openedDialog, setOpenedDialog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      taskName: "",
      description: "",
      status: "todo",
    },
  });

  const handleCloseDialog = () => {
    setOpenedDialog(true);
  };
  const HandleCloseDialog = () => {
    setOpenedDialog(false);
  };

  const handleCreateTask = () => {
    // throw new Error("Function not implemented.");
  };

  return (
    <>
      <button
        className="bg-slate-100 text-slate-950 rounded-full w-auto px-3 py-2 hover:cursor-pointer hover:bg-slate-200"
        onClick={handleCloseDialog}
      >
        Create task
      </button>
      <dialog
        className="p-6 h-screen w-screen top-0 text-white place-content-center place-items-center bg-slate-950/50"
        open={openedDialog}
      >
        <div className="bg-slate-800 p-4 rounded-lg w-full max-w-xl">
          <form
            className="flex flex-col gap-2 mb-6"
            onSubmit={handleCreateTask}
          >
            <h2 className="text-center text-xl">Task</h2>
            <label htmlFor="taskName">Task name</label>
            <input
              className="px-2 mb-2 py-1 rounded-lg  bg-slate-900 focus:outline-slate-600 outline outline-slate-700"
              type="text"
              name="taskName"
              id="taskName"
            />

            <label htmlFor="taskDescription">Description</label>
            <textarea
              className="px-2 mb-2 py-1 rounded-lg  bg-slate-900 focus:outline-slate-600 outline outline-slate-700 field-sizing-content"
              name="taskDescription"
              id="taskDescription"
            />

            <label htmlFor="taskStatus">Status</label>
            <select
              className="bg-slate-900 p-2 rounded-lg"
              name="taskStatus"
              id="taskStatus"
            >
              <option value={STATUS.TODO} defaultChecked>
                To do
              </option>
              <option value={STATUS.IN_PROGRESS}>In progress</option>
              <option value={STATUS.DONE}>Done</option>
            </select>
          </form>

          <div className="flex justify-end gap-2">
            <button
              className="hover:cursor-pointer bg-slate-50 text-slate-950 px-3 py-2 rounded-full hover:bg-slate-200"
              type="submit"
            >
              Save task
            </button>
            <button
              className="hover:cursor-pointer bg-slate-700 text-slate-200 px-3 py-2 rounded-full hover:bg-slate-600"
              onClick={HandleCloseDialog}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
