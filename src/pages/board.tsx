import SearchBar from "@/components/SearchBar";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { getErrMsg, getSortedIssues } from "../services/helpers";
import Toaster from "@/components/Toaster";
import { toast } from "react-toastify";
import Board from "@/components/Board";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setRepoInfo } from "@/redux/repoInfoSlice";
import RepoInfo from "@/components/RepoInfo";
import { useGetRepoInfoQuery, useGetRepoIssuesQuery } from "@/redux/issuesApi";
import { useRouter } from "next/router";
import { selectUser } from "@/redux/selectors";

function BoardPage() {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { token } = useSelector(selectUser);
  const dispatch = useDispatch();
  const queryFromUrl = () => url.substring("https://github.com/".length);
  const { data: repo } = useGetRepoInfoQuery(queryFromUrl(), {
    skip: url === "",
  });
  const {
    data: issues,
    error,
    isLoading,
  } = useGetRepoIssuesQuery(queryFromUrl(), {
    skip: url === "",
  });

  useEffect(() => {
    !token && router.push("/login");
  }, [router, token]);
  const handleFormSubmit = (url: string) => {
    setUrl(url);
  };
  return token ? (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      <RepoInfo />
      {isLoading && <Spinner animation="border" variant="info" />}
      <Board issues={issues} />
      <Toaster />
    </>
  ) : (
    <>
      <span>Loading...</span>
      <Spinner animation="border" role="status" />
    </>
  );
}

export default BoardPage;
