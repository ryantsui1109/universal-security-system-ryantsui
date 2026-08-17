import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";

function SignupNavbar() {
  return (
    <Navbar data-bs-theme="dark" bg="dark">
      <Container>
        <Navbar.Brand>USSR User Signup</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default SignupNavbar;
