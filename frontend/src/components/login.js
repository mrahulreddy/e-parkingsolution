import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import "./login.css";
import Loading from "./loading";
import ErrorMessage from "./ErrorMessage";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");

  //   console.log(userInfo);
  //   if (userInfo) {
  //     history.push("/dashboard");
  //   }
  // }, [history]);

  const signInSubmitHandler = async (e) => {
    e.preventDefault();

    setError(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // console.log("pass");
      // console.log(history);
      // history.push("/dashboard");
      window.location = "http://localhost:3000/dashboard";
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const signUpSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setError(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "/api/users/",
        { name, email, password },
        config
      );
      console.log(data);

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div classnName="outside">

      </div>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <Form onSubmit={signUpSubmitHandler}>
            <h1>Create Account</h1>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />

            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
        <div className="form-container sign-in-container">
          <Form onSubmit={signInSubmitHandler}>
            <h1>Sign in</h1>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/">Forgot your password?</a>
            <Button type="submit">Sign In</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;