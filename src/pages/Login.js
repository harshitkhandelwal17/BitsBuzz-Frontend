import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material"; //components needed to create login
import axios from "axios";
import { useDispatch } from "react-redux"; //to use login and logout functions and to dispatch them here after login
import { authActions } from "../redux/store"; //for login 
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //we create a variable of dispatch since it is a hook
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", { //end point of api will be login
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id); //we have created a variable and stored the user in local storage such that we can extract its ID since on the basis of id we will display his blogs on my blogs page, we get this userid from data.user._id
        dispatch(authActions.login()); //call login from authActions since user is login so that login state is active, and now login menus will be visible since is login is true
        toast.success("User Login Successfully"); //toast or alert notification after login successful
        navigate("/"); //after login we will redirect on home page
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <> {/*react fragment or syntactically sugar form*/}
      <form onSubmit={handleSubmit}>
        <Box 
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
          bgcolor="#33c9dc"
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Welcome Back!
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}//if not a user on clicking it will redirect to register page
            sx={{ borderRadius: 3, marginTop: 3, color : "#2E3B55" }}
          >
            Not a BitsBuzz member? Please Register!
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
