import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import ProfileNavbar from "./profile/components/ProfileNavbar";
import { Card } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";

function Profile() {
  const AuthInfo = useAuth();
  useEffect(() => {
    document.title = "My Profile - USSR";
  });

  function handleClick(e) {
    axios.post("/api/auth/logout", {}, { withCredentials: true });
    AuthInfo.setUser(null);
  }
  return (
    <>
      <ProfileNavbar></ProfileNavbar>
      <Container className="pt-5">
        <Row className="justify-content-center">
          <Card className="col-6">
            <Card.Body>
              <Card.Title>User info</Card.Title>
              <Card.Text>
                <strong>Username: </strong>
                {AuthInfo.user.username}
                <br />
                <strong>Nickname: </strong>
                {AuthInfo.user.nickname}
              </Card.Text>
              <Button onClick={handleClick}>Logout</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
