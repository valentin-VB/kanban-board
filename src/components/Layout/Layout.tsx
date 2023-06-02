import React from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container as="main" className="main-container">
        {children}
      </Container>
      ;
    </>
  );
}

export default Layout;
