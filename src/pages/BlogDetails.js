import React, { useState, useEffect } from "react"; //usestate so that we can hold the edits, useeffect hook to get the blog at inital time
import axios from "axios"; //post method of it to send back to server after editing
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"; //use params to get id from url, usenavigate to redirecvt or navigate to other page
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"; //import for form display at time of edit
const BlogDetails = () => {
  const [blog, setBlog] = useState({}); //new state created, initially empty object {}
  const id = useParams().id; //get blog id from url to edit it
  const navigate = useNavigate(); //variable of useNavigate hook created
  const [inputs, setInputs] = useState({});
  // function to get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`${process.env.URL}/api/v1/blog/get-blog/${id}`); //get that blog details from backend using axios get on basis of blog id and after getting it destructure its data 
      if (data?.success) {
        setBlog(data?.blog); //data mila toh blog lenge aur set karwadenge naye state mai
        setInputs({ //it comes from data we are recieving from above, apply optional chaining here if data aane mai time laga toh application will crash
          title: data?.blog.title, //inital time par blog form will be filled so that we can edit it 
          description: data?.blog.description, //jo blog se data ayega usko setinputs mai fulfill karadenge
          image: data?.blog.image,//so initially when this page opens we will get all these fields filled and now we can edit
        });
      }
    } catch (error) {
      console.log(error); //print error as it is on console
    }
  };

  useEffect(() => { //to get it at inital time we will use useeffect hook
    getBlogDetail(); //function call
  }, [id]); //parameter or dependency is id for this function [id]

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.URL}/api/v1/blog/update-blog/${id}`, { //put method for update, id of blog passed
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Buzz Updated"); //alert message changed to update
        navigate("/my-blogs"); //after update navigate to my blogs page
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);
  return (
    <v>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update A Buzz
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
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
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">
            Update Buzz
          </Button>
        </Box>
      </form>
    </v>
  );
};

export default BlogDetails;
