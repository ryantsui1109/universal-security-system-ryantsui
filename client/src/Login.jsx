import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginNavbar from "./login/components/LoginNavbar";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import LoginCard from "./login/components/LoginCard";
import classNames from "classnames";
import { useEffect } from "react";
import './HideEmptyParagraph.css'

function Login() {
  useEffect(() => {
    document.title = "Login - USSR";
  });

  return (
    <>
      <LoginNavbar></LoginNavbar>
      <Container className="pt-5">
        <Row className="justify-content-center">
          <LoginCard></LoginCard>
        </Row>
      </Container>
    </>
  );
}

export default Login;
