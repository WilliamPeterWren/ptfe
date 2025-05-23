import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// import UserContext from '../../context/userContext';
import UserContext from "../../../context/userContext";
import apiUser from "../../../api/apiUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const authEmail = Cookies.get("authEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      identifier: email,
      password: password,
    };

    try {
      const response = await apiUser.loginUser(data);
      console.log("response data: ", response.data);

      var username = response.data.user.username;

      setUser(username);
      console.log("response.data.user: ", response.data.user);

      Cookies.set("authId", response.data.user.id, { expires: 7 });
      Cookies.set("authUsername", response.data.user.username, { expires: 7 });

      Cookies.set("authEmail", email, { expires: 7 }); // Expires in 7 days
      Cookies.set("authPassword", password, { expires: 7 }); // Expires in 7 days

      Cookies.set("authPhone", response.data.user.phone, { expires: 7 }); // Expires in 7 days
      Cookies.set("authAddress", response.data.user.address, { expires: 7 }); // Expires in 7 days

      Cookies.set("authFirstname", response.data.user.first_name, {
        expires: 7,
      }); // Expires in 7 days
      Cookies.set("authLastname", response.data.user.last_name, { expires: 7 }); // Expires in 7 days

      navigate("/home");
    } catch (error) {
      alert("Wrong Username or Password");
      console.log(error);
    }
  };

  return (
    <section className="" style={{}}>
      <h1>login page</h1>
    </section>
  );
}

export default Login;
