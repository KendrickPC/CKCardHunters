import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigateTo = useNavigate()
  
  // console.log("LOCATION", location)
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigateTo(redirect)
    }
  }, [navigateTo, userInfo, redirect]);

  const submitHandler = (evt) => {
    evt.preventDefault();
    // Dispatch Login
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {/* Email */}
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* Password */}

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Register? New Customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
