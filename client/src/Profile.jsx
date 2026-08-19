import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import ProfileNavbar from "./profile/components/ProfileNavbar";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    document.title = "My Profile - USSR";
  });

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios.get("/api/me");
        setUserInfo(response.data.userInfo); // 驗證成功，存入使用者資料
      } catch {
        window.location.replace("/login");
      }
    }
    fetchUserInfo();
  },[]);

  function handleClick(e) {
    axios.post("/api/auth/logout", {}, { withCredentials: true });
    window.location.replace("/login");
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
                {userInfo ? userInfo.username : ""}
                <br />
                <strong>Nickname: </strong>
                {userInfo ? userInfo.nickname : ""}
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
