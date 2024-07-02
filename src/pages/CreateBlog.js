import React, { useState } from "react"; //usestate hook for creation of state
import axios from "axios"; //to send n/w request to server to submit form data from frontend to backend
import { useNavigate } from "react-router-dom"; //to navigate to my blogs page after blog submission on create a blog
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const id = localStorage.getItem("userId"); //id is saved in local storage at time of login
  const navigate = useNavigate(); //to navigate user to my blogs after post creation
  const [inputs, setInputs] = useState({ //creation of state and objects
    title: "",
    description: "", //initially empty we will set these inputs by user feedings in the form
    image: "",  //we will bind these inputs with input box of form
  });
  // input change function will handle onChange of textfield of form
  const handleChange = (e) => { 
    setInputs((prevState) => ({ //prevstate ko manage krwadenge
      ...prevState, //data which is coming using that we will fulfill prev state
      [e.target.name]: e.target.value,//textfield ke name ki property ko target karenge aur usko value se fulfill krwadenge
    }));
  };
  //form submission function what to do on submission
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the default behaviour of submit using event
    try {
      const { data } = await axios.post(`${process.env.URL}/api/v1/blog/create-blog`, { //destructure data and we are sending data using axios post to server of create-blog or at that url
        title: inputs.title, //all data and from where it comes written here so that we can send it to backend
        description: inputs.description, //data that we need to send using axios post
        image: inputs.image, //these 3 fields will come from inputs of form, input is a state we are getting data from it
        user: id, //blog corresponds to a particular user
      });
      if (data?.success) { //if we get data succesfully from user
        toast.success("Buzz Created"); //notification created you can use alert also
        navigate("/my-blogs"); //navigated to this page or redirected after blog creation
      }
    } catch (error) {
      console.log(error); //display error on console as it is
    }
  };
  return (
    <> {/*fragment, syntactical sugar form*/}
      <form onSubmit={handleSubmit}> {/*on submission of form handleSubmit function is called */}
        <Box
          width={"40%"}
          border={2}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
          color="#ffef62"
          bgcolor="#33c9dc"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="#2E3B55"
          >
            Create A Buzz
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }} //mb : margin bottom, mt: margintop, input label above text field
          >
            Title
          </InputLabel>
          <TextField //for taking title input
            name="title" //name property to be targeted by handlechange
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required //to make compulsory this field to be entered by the user
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description" //name property so that we can access it in handle change, keep the name same as in model
            value={inputs.description} //value will be fetched from input description
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image" //in name property wahi naam dena jo model mai rakha h naam
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained"> {/*submit button to create a blog post */}
            SUBMIT 
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog; //exported this page component from here will be imported in app.js
