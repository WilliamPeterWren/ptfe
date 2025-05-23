import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import UserContext from "../../../context/userContext";
import apiUser from "../../../api/apiUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Cookies.remove('adminCookie')

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    } else {
      navigate("/admin/dashboard");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      identifier: email,
      password: password,
    };

    try {
      const response = await apiUser.loginUser(data);
      console.log("response: ", response.data.user);
      const getId = response.data.user.id;
      const checkResponse = await apiUser.getOne(getId).then((res) => {
        const id = res.data.role.id;
        if (id === 1) {
          var username = response.data.user.username;
          setUser(username);
          Cookies.set("adminCookie", response.data.user.username, {
            expires: 1,
          });
          navigate("/admin/dashboard");
        } else {
          alert("This is for admin only");
          navigate("/admin/login");
        }
      });
      console.log("check response: ", checkResponse);
      // console.log("check response id: ", checkResponse.data.role.id);
      // const checkId = checkResponse.data.role.id;

      // if(checkId === 1){
      //     var username = response.data.user.username;
      //     setUser(username);
      //     Cookies.set('adminCookie',response.data.user.username, {expires: 1});
      //     navigate('/admin/dashboard');
      // }
      // else{
      //     alert("This is for admin only");
      //     navigate('/admin/login');
      // }
    } catch (error) {
      alert("Wrong Username or Password");
      console.log(error.message);
    }
  };

  return (
    <section className="" style={{}}>
      <h1>admin login</h1>
    </section>
  );
}

export default Login;
