import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignupCard() {
  const [message, setMessage] = useState(null);
  const AuthInfo = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    const payload = {
      username: fd.get("username"),
      password: fd.get("password"),
      nickname: fd.get("nickname"),
      passwordConfirm: fd.get("passwordConfirm"),
    };

    if (payload.username == "" || payload.password == "") {
      setMessage(<span className="text-danger">請輸入帳號與密碼</span>);
    } else {
      if (payload.password === payload.passwordConfirm) {
        try {
          const res = await axios.post("/api/auth/register", payload, {
            withCredentials: true,
          });

          setMessage(<span>註冊成功，<Link to="/login">立即登入</Link></span>)
        } catch (error) {
          if (error.response) {
            setMessage(<span className="text-danger">{error.response.data.message}</span>);
          } else {
            setMessage(<span className="text-danger">"網路連線錯誤：" + {error.message}</span>);
          }
        }
      } else {
        setMessage(<span className="text-danger">密碼與確認不一致</span>);
      }
    }
  }

  return (
    <>
      <div className="col-6">
        <Card className="mb-2">
          <Card.Body>
            <Form onSubmit={handleSubmit} id="signup">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>
                  Username<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNickname">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  name="nickname"
                  type="text"
                  placeholder="Enter nickname"
                />
              </Form.Group>
              <hr className="mb-3"></hr>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  Password<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <Form.Label>
                  Confirm Password<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>

              <p>{message}</p>
            </Form>
          </Card.Body>
          <Card.Body className="text-end">
            <Button variant="primary" type="submit" form="signup">
              Sign Up
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default SignupCard;
