import { ColumnType } from "@/services/enums";
import Issue from "../Issue/Issue";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { IDragItem } from "@/services/interfaces";
import { getSortedIssues, titleFromType } from "@/services/helpers";
import { selectIssues, selectRepoInfo } from "@/redux/selectors";

import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

function Column({ type }: { type: ColumnType }) {
  const [currentRepoId, setCurrentRepoId] = useState();
  const dispatch = useDispatch();
  const repos = useSelector(selectIssues);
  const { id } = useSelector(selectRepoInfo);
  // console.log("id:", id);
  // const currentRepo = repos.repos.find(({ repoId }) => repoId === id);

  useEffect(() => {
    setCurrentRepoId(id);
  }, [id]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Issue",
    drop: (dragItem: IDragItem) => {
      // if (!dragItem || (dragItem.fromColumn === type && id)) return;
      // console.log("id2:", id);
      // const f = localStorage.getItem("persist:reposIssues");
      // const actionPayload = { type, ...dragItem, currentRepoId: id };
      // function deepParseJSON(json) {
      //   console.log("deepParseJSON:", deepParseJSON);
      //   console.log("deepParseJSON:", deepParseJSON);
      //   // First, check if the JSON is already a parsed object
      //   if (typeof json !== "string") {
      //     return json;
      //   }
      //   let parsed;
      //   try {
      //     parsed = JSON.parse(json);
      //   } catch (e) {
      //     // If the JSON string can't be parsed, return the original string
      //     return json;
      //   }
      //   // Recursively parse all nested objects and arrays
      //   for (let key in parsed) {
      //     if (typeof parsed[key] === "object") {
      //       parsed[key] = deepParseJSON(parsed[key]);
      //     }
      //   }
      //   return parsed;
      // }
      // // dispatch(handleIssueDrop(actionPayload));
      // console.log("actionPayload:", actionPayload);
      // dispatch(onIssueDrop(actionPayload));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="board__column"
      style={{ opacity: isOver ? 0.8 : 1 }}
    >
      <h2 className="board__title">{titleFromType(type)}</h2>
      <ul>
        {"" &&
          id &&
          getSortedIssues(currentRepo.issues)[type].map((issue, index) => (
            <Issue
              key={issue?.id}
              issue={issue}
              index={index}
              fromColumn={type}
            />
          ))}
      </ul>
    </div>
  );
}

export default Column;
