import Link from "next/link";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";

const WelcomePage = () => {
  return (
    <>
      <Container>
        <div className="hero">
          <h1 className="hero__title"> Welcome to the Kanban Board</h1>
          <Image
            fluid
            className="hero__img"
            alt="board"
            src="/Kanban_Website.png"
          ></Image>
        </div>
      </Container>
      <ul className="d-flex mt-4 justify-content-evenly">
        <li className="note note--orange">
          <p>Organize your tasks and track their progress.</p>
        </li>
        <li className="note note--gray">
          <p> Easy and intuitive create edit and delete them</p>
        </li>
        <li className="note note--yellow">
          <p>
            To get started, please <Link href="/register">register</Link> or{" "}
            <Link href="/login">log in</Link> to your account.
          </p>
        </li>
      </ul>
    </>
  );
};

export default WelcomePage;
