import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";

function ProfileNavbar(){
  return <Navbar data-bs-theme="dark" bg="dark">
    <Container>
      <Navbar.Brand>USSR</Navbar.Brand>
    </Container>
  </Navbar>
}

export default ProfileNavbar;