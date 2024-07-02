import React, { useState } from "react"; //create a state here so that we can send the data to the server from here
import { useNavigate } from "react-router-dom"; //for navigating between this page to any other page
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios"; //we use axios for network request
const Register = () => {
  const navigate = useNavigate(); //variable creation of useNavigate hook, now we can use it
  //state creation using useState, state is created for sending data from here(client) to the server
  const [inputs, setInputs] = useState({
    name: "",
    email: "",       //we have passed these objects here in initial state they are empty
    password: "",
  });

  //handle input change, input that user is typing of register form
  const handleChange = (e) => { //e is event due to which we can change values of textfields
    setInputs((prevState) => ({ //manage previous state before changing, previous state means previous data
      ...prevState, //spread prevstate means keep the prev data
      [e.target.name]: e.target.value, //fullfill name with targeted value
    }));
  };//after this we can succesfully type data in form

  //form handle, we have to send form data to server
  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent default behaviour of page refresh on form submission
    try {//to bind data recieved from user with our api, we will send network request using axios
      const { data } = await axios.post(`${process.env.URL}/api/v1/user/register`, {
        username: inputs.name,
        email: inputs.email, //pass input data to these parameters(model) and post it on server using axios
        password: inputs.password,
      });
      if (data.success) { //if we get data and success response from it
        toast.success("User Register Successfully"); //to show notification msg to user we can also use alert notification insted of toast
        navigate("/login"); //to navigate it to login page post register
      }
    } catch (error) {
      console.log(error); //print error as it is on console
    }
  };
  return (
    <> {/*div converted to react fragment*/}
      <form onSubmit={handleSubmit}> {/* we created a new function on onSubmit event of this form to save this data that user enters and pass it to server*/}
        <Box
          maxWidth={450} //450 pixels 
          display="flex"
          flexDirection={"column"}
          alignItems="center"  //items or this textfields will be in centre
          justifyContent={"center"} //items justified to centre
          margin="auto"
          marginTop={5} //margein from top
          boxShadow="10px 10px 20px #ccc"  //box shadow x 10px y 10px blur 20px color gray #ccc
          padding={3}
          borderRadius={5} //to make box border rounded
          bgcolor="#33c9dc"
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }} //to make text uppercase
            padding={3}
            textAlign="center"
            color="#2E3B55"
          >
            Start Buzzing!
          </Typography>
          <TextField  //to add input textfields
            placeholder="name" //placeholder tells user what to fill here, here the user needs to provide name
            value={inputs.name} //name from inputs so that we can send it to server
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"} //type of data user can enter
            required //this field is required
          />
          <TextField
            placeholder="email"
            value={inputs.email} //to send it to server
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password} //to send it to server
            name="password" //make sure to set name same as name of object in model
            margin="normal"
            type={"password"}
            required
            onChange={handleChange} //so that user can feed input in textfield to handle that event
          />

          <Button //to submit the credentials provided by user, Submit Button
            type="submit" //since it is in form
            sx={{ borderRadius: 3, marginTop: 3 }} //to make button border circular
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button //we have redirected this button to login page
            onClick={() => navigate("/login")} //on clicking this button we will go to login page
            sx={{ borderRadius: 3, marginTop: 3,  color : "#2E3B55" }}
          >
            Already a BitsBuzz member? Please Login!
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
