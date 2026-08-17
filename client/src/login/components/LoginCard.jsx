import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function LoginCard() {
  const [errorMessage, setErrorMessage] = useState("");
  const AuthInfo = useAuth();
  const navigate = useNavigate();

  function handleSignup() {
    navigate("/signup");
  }

  if (AuthInfo.user) {
    return <Navigate to="/profile"></Navigate>;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    const payload = {
      username: fd.get("username"),
      password: fd.get("password"),
    };

    if (payload.username == "" || payload.password == "") {
      setErrorMessage("請輸入帳號與密碼");
    } else {
      try {
        const res = await axios.post("/api/auth/login", payload, {
          withCredentials: true,
        });

        AuthInfo.setUser(res.data.userInfo);
        navigate("/profile", { replace: true });
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("網路連線錯誤：" + error.message);
        }
      }
    }
  }

  return (
    <>
      <div className="col-6">
        <Card className="mb-2">
          <Card.Body>
            <Form onSubmit={handleSubmit} id="login">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <p className="text-danger">{errorMessage}</p>
            </Form>
          </Card.Body>
          <Card.Body className="text-end">
            <Button variant="link" onClick={handleSignup}>
              Sign Up
            </Button>
            <Button variant="primary" type="submit" form="login">
              Login
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default LoginCard;
