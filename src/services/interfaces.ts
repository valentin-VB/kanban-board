import { ColumnType } from "./enums";

// export interface IRegisterData {
//   name: string;
//   email: string;
//   password: string;
//   confirm_password: string;
// }

export interface IIssue {
  id: number;
  title: string;
  number: number;
  created_at: string;
  state: string;
  assignee: null | [];
}

export interface ISortedIssues {
  open: IIssue[];
  closed: IIssue[];
  withAssignee: IIssue[];
}

export interface IDragItem {
  index: number;
  id: IIssue["id"];
  fromColumn: ColumnType;
}

export interface IRepoInfo {
  id: number;
  name: string;
  url: string;
  stars: number | null;
}

export interface IRepos {
  repos: IRepoInfo[];
}
