export interface BaseTask {
  task: string;
  date: Date;
  complete: boolean
}
export interface RawJson extends BaseTask{
  _id: string;
  complete: boolean;
}
export interface Task extends RawJson{
  showDetails: boolean;
}
export interface CreateResponse extends HttpBaseResponse{
  insertedId: string,
  modifiedCount: number
}
export interface ModifiedResponse extends HttpBaseResponse {
  modifiedCount: number
}
export interface HttpBaseResponse {
  status: number,
  msg: string,
  ok: boolean,
}
export interface HttpPostLogin {
  username: string,
  password: string
}
export interface HttpGetTasks extends HttpBaseResponse {
  tasks: Task[]
}
export interface UserLoggedIn extends HttpBaseResponse {
  userLoggedIn: boolean,
  user: string
}
