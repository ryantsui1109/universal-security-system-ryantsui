import { Container, Row } from "react-bootstrap";
import SignupNavbar from "./signup/components/SignupNavbar";
import SignupCard from "./signup/components/SignupCard";
import { useEffect } from "react";
import "./HideEmptyParagraph.css";

function Signup() {
  useEffect(()=>{
    document.title="Sign Up - USSR"
  })
  return (
    <>
      <SignupNavbar></SignupNavbar>
      <Container className="pt-5">
        <Row className="justify-content-center">
          <SignupCard></SignupCard>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
