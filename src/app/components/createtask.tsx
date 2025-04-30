"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createTaskFormSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { STATUS } from "@/app/constants";

export default function CreateTask() {
  const [openedDialog, setOpenedDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: STATUS.TODO.id,
    },
  });

  const handleOpenDialog = () => {
    setOpenedDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenedDialog(false);
  };

  const handleCreateTask = (values: z.infer<typeof createTaskFormSchema>) => {
    startTransition(async () => {
      fetch("/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOpenedDialog(false);
        })
        .catch((err) => {
          setError(err);
        });
    });
  };

  return (
    <>
      <button
        className="w-auto px-3 py-2 rounded-full bg-slate-100 text-slate-950 hover:cursor-pointer hover:bg-slate-200"
        onClick={handleOpenDialog}
      >
        Create task
      </button>
      <dialog
        className="top-0 w-screen h-screen p-6 text-white place-content-center place-items-center bg-slate-950/50"
        open={openedDialog}
      >
        <div className="relative w-full max-w-xl px-4 py-6 rounded-lg bg-slate-800">
          <h2 className="text-xl text-center">Create task</h2>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(handleCreateTask)}
          >
            <label htmlFor="taskTitle">Task title</label>
            <input
              className="px-2 py-1 rounded-lg bg-slate-900 focus:outline-slate-600 outline outline-slate-700"
              type="text"
              id="taskTitle"
              {...register("title")}
            />
            {errors.title?.message && (
              <span className="text-sm text-red-500">
                {errors.title?.message}
              </span>
            )}

            <label htmlFor="taskDescription">Description</label>
            <textarea
              className="px-2 py-1 rounded-lg bg-slate-900 focus:outline-slate-600 outline outline-slate-700 field-sizing-content"
              id="taskDescription"
              {...register("description")}
            />

            <label htmlFor="taskStatus">Status</label>
            <select
              className="p-2 mb-4 rounded-lg bg-slate-900"
              id="taskStatus"
              {...register("status")}
            >
              <option value={STATUS.TODO.id} defaultChecked>
                To do
              </option>
              <option value={STATUS.IN_PROGRESS.id}>In progress</option>
              <option value={STATUS.DONE.id}>Done</option>
            </select>
            <span>{error}</span>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-2 rounded-full hover:cursor-pointer bg-slate-50 text-slate-950 hover:bg-slate-200"
                type="submit"
                disabled={isPending}
              >
                Save task
              </button>
              <button
                className="px-3 py-2 rounded-full hover:cursor-pointer bg-slate-700 text-slate-200 hover:bg-slate-600"
                type="button"
                onClick={handleCloseDialog}
                disabled={isPending}
              >
                Close
              </button>
            </div>
          </form>
          {isPending && (
            <div className="absolute inset-0 grid w-full h-full place-items-center bg-slate-950/50">
              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
