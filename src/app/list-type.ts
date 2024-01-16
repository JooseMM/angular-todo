export interface task {
  task: string;
}
export interface rawjson extends task{
  _id: string;
  complete: boolean;
  date: Date;
}
export interface ListType extends rawjson{
  showDetails: boolean;
}
