import { Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

function AuthNav() {
  return (
    <Nav>
      <Nav.Link as="div">
        <Link href="/login" className="header__link">
          Sign In
        </Link>
      </Nav.Link>
      <Nav.Link as="div">
        <Link href="/register" className="header__link">
          Sign Up
        </Link>
      </Nav.Link>
    </Nav>
  );
}

export default AuthNav;
