"use client";

import { deleteTaskAction } from "@/actions/taskAction";
import { useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function DeleteTask({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const response = await deleteTaskAction(taskId);
      if (response?.error) {
        toast.error(response?.error);
      } else {
        toast.success("Task deleted successfully");
      }
    });
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <button
        className="hover:cursor-pointer hover:bg-red-700 p-2 rounded-lg"
        type="submit"
        onClick={handleDeleteClick}
        disabled={isPending}
      >
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
    </>
  );
}
