export interface ITask {
  id: string;
  title: string;
  status: boolean;
}

export interface ITasks {
  [id: string]: ITask;
}