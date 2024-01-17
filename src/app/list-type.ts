export interface task {
  task: string;
  date: Date;
}
export interface rawjson extends task{
  _id: string;
  complete: boolean;
}
export interface ListType extends rawjson{
  showDetails: boolean;
}
