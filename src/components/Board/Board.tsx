import Column from "@/components/Column";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ColumnType } from "@/services/enums";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { selectRepoInfo, selectSortedIssues } from "@/redux/selectors";
import { useState, useEffect, useRef } from "react";

import { getDataToStore } from "@/services/helpers";

function Board() {
  const [orderedIssues, setOrderedIssues] = useState([]);
  const [currentRepo, setCurrentRepo] = useState();
  // const storedIssues = useSelector(selectSortedIssues);
  const dispatch = useDispatch();
  // console.log("storedIssues:", storedIssues);
  const repoInfo = useSelector(selectRepoInfo);

  const prevRepo = useRef();
  useEffect(() => {
    setCurrentRepo(repoInfo.id);
    if (currentRepo) prevRepo.current = currentRepo;
  }, [currentRepo, repoInfo.id]);

  // useEffect(() => {
  //   const reposOrderData = JSON.parse(localStorage.getItem("repos")) || [];
  //   const repoInStorage = reposOrderData.find(
  //     ({ repo }) => repoInfo.id === repo
  //   );

  //   const isStoredIssues =
  //     storedIssues?.open.length ||
  //     storedIssues?.closed.length ||
  //     storedIssues?.withAssignee.length;

  //   if (!repoInStorage && isStoredIssues) {
  //     const dataToStore = getDataToStore(storedIssues, repoInfo);
  //     let newData = [...reposOrderData, dataToStore];
  //     if (newData) localStorage.setItem("repos", JSON.stringify(newData));
  //   }

  //   if (repoInStorage) {
  //     let reorderedIssues = {};
  //     let idsOrder = {};
  //     for (const issuesType in repoInStorage.issuesOrder) {
  //       const issuesTypeArr = repoInStorage.issuesOrder[issuesType];
  //       const swapIssues = [];
  //       issuesTypeArr.forEach((pos) => {
  //         const res = issues.find((issue) => issue.id === pos);
  //         return res && swapIssues.push(res);
  //       });
  //       // console.log("swapIssues:", swapIssues);

  //       const swapIssuesIds = swapIssues.map(({ id }) => id);
  //       let newFetchIssuesIds = [];
  //       const newFetchIssues = storedIssues[issuesType].filter(({ id }) => {
  //         if (!swapIssuesIds.includes(id)) {
  //           newFetchIssuesIds.push(id);
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });

  //       reorderedIssues[issuesType] = [...newFetchIssues, ...swapIssues];

  //       idsOrder[issuesType] = [...newFetchIssuesIds, ...swapIssuesIds];
  //     }
  //     const dataToStore = {
  //       repo: repoInfo.id,
  //       issuesOrder: idsOrder,
  //     };
  //     const updatedIdsOrder = reposOrderData.map((repo) =>
  //       repo.repo === repoInfo.id ? dataToStore : repo
  //     );
  //     localStorage.setItem("repos", JSON.stringify(updatedIdsOrder));
  //     // console.log("reorderedIssues:", reorderedIssues);
  //     setOrderedIssues(reorderedIssues);
  //   } else {
  //     setOrderedIssues(storedIssues);
  //   }
  // }, [currentRepo, repoInfo, storedIssues]);

  return (
    orderedIssues && (
      <Row gutter={16} className="mt-3">
        <DndProvider backend={HTML5Backend}>
          <Col sm={4}>
            <Column type={ColumnType.TO_DO} />
          </Col>
          <Col sm={4}>
            <Column type={ColumnType.IN_PROGRESS} />
          </Col>
          <Col sm={4}>
            <Column type={ColumnType.DONE} />
          </Col>
        </DndProvider>
      </Row>
    )
  );
}

export default Board;
