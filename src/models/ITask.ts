export interface ITask {
  id: number;
  half_year: number;
  year: number;
  account_id: number;
  createdAt: string;
}

export type TaskUser = Omit<ITask, "account_id"> & {
  account: { FIO: string };
  done: boolean;
};
