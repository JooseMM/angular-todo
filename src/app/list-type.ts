
export interface rawjson {
  _id: string;
  task: string;
  complete: boolean;
  date: Date;
}
export interface ListType extends rawjson{
  showDetails: boolean;
}
