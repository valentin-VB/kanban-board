import { IIssue, ISortedIssues } from "./interfaces";
export const getSortedIssues = (issues: IIssue[]): ISortedIssues => {
  return issues.reduce(
    (acc, issue) => {
      const { state, assignee } = issue;
      if (state === "open" && !assignee) {
        acc.open.push(issue);
      }

      if (state === "closed") {
        acc.closed.push(issue);
      }

      if (state === "open" && assignee) {
        acc.withAssignee.push(issue);
      }
      return acc;
    },
    { open: [], closed: [], withAssignee: [] } as {
      open: IIssue[];
      closed: IIssue[];
      withAssignee: IIssue[];
    }
  );
};

export const getDataToStore = (arr, currentRepo) => {
  const getIdsOrder = (arr) => arr.map((issue: IIssue) => issue.id);
  const open = getIdsOrder(arr.open);
  const withAssignee = getIdsOrder(arr.withAssignee);
  const closed = getIdsOrder(arr.closed);
  return {
    repo: currentRepo.id,
    issuesOrder: {
      open,
      withAssignee,
      closed,
    },
  };
};

export const getErrMsg = (error: any) => {
  let errMsg = "Unknown error occurred";
  if (error && "status" in error) {
    if (error.status === 404) {
      errMsg = "This resource not found";
    } else {
      errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    }
  }

  return errMsg;
};

export const daysFromToday = (dateString: string): number => {
  const created = new Date(dateString);
  const today = new Date();
  const timeDiff = created.getTime() - today.getTime();
  const daysDiff = -Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

export const getRandomColor = () => {
  const colors = ["#227c9d", "#17c3b2", "#fef9ef", "#ffcb77", "#fe6d73"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const titleFromType = (type: string) => {
  let columnTitle = "";
  switch (type) {
    case "open":
      columnTitle = "To do";
      break;
    case "withAssignee":
      columnTitle = "In Progress";
      break;
    case "closed":
      columnTitle = "Done";
      break;
  }

  return columnTitle;
};
