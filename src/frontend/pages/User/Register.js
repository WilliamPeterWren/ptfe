import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import apiUser from "../../../api/apiUser";
function Register() {
  const [nation, setNation] = useState("vietnam");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    repeat_password: "re",
  });
  const [user, setUser] = useState([]);

  useEffect(() => {
    apiUser.getAll().then((res) => {
      const form = res.data.map((item) => {
        return {
          username: item.username,
          email: item.email,
          phone: item.phone,
        };
      });
      setUser(form);
    });
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleNationChange = (e) => {
    setNation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === formData.repeat_password) {
      var check = true;

      user.map((item) => {
        if (item.username === formData.username) {
          toast.warning(`Already has this user name!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              top: "-50%",
              transform: "translateY(50%)",
              marginRight: "2%",
              width: "fit-content",
            },
          });
          check = false;
        }
        if (item.email === formData.email) {
          toast.warning(`${formData.email} has register to our!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              top: "-50%",
              transform: "translateY(50%)",
              marginRight: "2%",
              width: "fit-content",
            },
          });
          check = false;
        }
        if (item.phone === formData.phone) {
          toast.warning(`This ${formData.phone} has been used`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              top: "-50%",
              transform: "translateY(50%)",
              marginRight: "2%",
              width: "fit-content",
            },
          });
          check = false;
        }
      });

      if (formData.password.length < 8) {
        check = false;
        toast.warning(`Password is weak! At least 8 character`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            top: "-50%",
            transform: "translateY(50%)",
            marginRight: "2%",
            width: "fit-content",
          },
        });
      }

      if (check) {
        formData.address += ", " + nation;
        console.log("form data: ", formData);

        try {
          axios
            .post("http://localhost:1337/api/auth/local/register", {
              first_name: formData.first_name,
              last_name: formData.last_name,
              username: formData.username,
              email: formData.email,
              address: formData.address,
              phone: formData.phone,
              password: formData.password,
            })
            .then((response) => {
              toast.success(`Welcome ${formData.username}!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                  top: "-50%",
                  transform: "translateY(50%)",
                  marginRight: "2%",
                  width: "fit-content",
                },
              });

              navigate("/login");
            })
            .catch((error) => {
              toast.error(`Something is wrong with this Account`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                  top: "-50%",
                  transform: "translateY(50%)",
                  marginRight: "2%",
                  width: "fit-content",
                },
              });
            });
        } catch (error) {
          // console.log("Error nè: ",error);
          toast.error(`It's our fault! Not your!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              top: "-50%",
              transform: "translateY(50%)",
              marginRight: "2%",
              width: "fit-content",
            },
          });
        }
      }
    } else {
      alert("Passwords do not match");
      toast.error(`Password do not match`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          top: "-50%",
          transform: "translateY(50%)",
          marginRight: "2%",
          width: "fit-content",
        },
      });
    }
  };

  return (
    <section className="section-content padding-y">
      <h1>register page</h1>
    </section>
  );
}

export default Register;
