export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    email: string;
  };
}

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
