import { selectRepoInfo } from "@/redux/selectors";
import { useSelector } from "react-redux";

function RepoInfo() {
  const repoInfo = useSelector(selectRepoInfo);
  return (
    repoInfo.name && (
      <div className="d-flex mt-3" style={{ gap: 10 }}>
        <a href={repoInfo.url}>{repoInfo.name.replace("/", " > ")}</a>
        <div>{`⭐ ${repoInfo.stars}`}</div>
      </div>
    )
  );
}

export default RepoInfo;
