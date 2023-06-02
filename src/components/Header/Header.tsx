import { Button, Navbar } from "react-bootstrap";
import AuthNav from "../AuthNav/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/selectors";
import { LuLogOut } from "react-icons/lu";
import { handleLogOut } from "@/services/api";
import { logOut } from "@/redux/authSlice";
import { useRouter } from "next/router";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, user_email } = useSelector(selectUser);

  const handleLogOutBtnClick = async () => {
    try {
      await handleLogOut();
      dispatch(logOut());
      router.push("/");
    } catch (err) {
      console.error("log out error", err);
    }
  };
  console.log("token:", token);
  return (
    <Navbar as="header" className="header" bg="dark" variant="dark">
      <Navbar.Brand href="/">Kanban-Board</Navbar.Brand>
      {token ? (
        <div className="user-menu">
          <p className="user-menu__greetings">{`Welcome, ${user_email}`}</p>
          <Button
            variant="outline-light"
            className="user-menu__log-out-btn"
            onClick={handleLogOutBtnClick}
          >
            <span>Log Out</span>
            <LuLogOut size="25px" />
          </Button>
        </div>
      ) : (
        <AuthNav />
      )}
    </Navbar>
  );
}

export default Header;
