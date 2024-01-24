export interface Task {
  task: string;
  date: Date;
}
export interface RawJson extends Task{
  _id: string;
  complete: boolean;
}
export interface ListType extends RawJson{
  showDetails: boolean;
}
export interface CreateResponse {
  acknowledged: boolean,
  insertedId: string
}
export interface HttpResponse {
  status: number,
  msg: string,
  ok: boolean,
}
export interface HttpPostLogin {
  username: string,
  password: string
}
export interface HttpGetTasks extends HttpResponse {
  tasks: ListType[]
}
export interface UserLoggedIn extends HttpResponse {
  userLoggedIn: boolean,
  user: string
}
