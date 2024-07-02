import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { lightBlue, red, yellow } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit"; //to import edit icon
import DeleteIcon from "@mui/icons-material/Delete"; //to import delete icon
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({ //destructuring data of a blog so that we can represent in form of blog card
  title,
  description,
  image,
  username,
  time, //for created at property
  id, //blog id
  isUser, //user id, using this we will add two icons edit and delete
}) {
  const navigate = useNavigate(); //for using navigate function here
  const handleEdit = () => { //will handle on click of edit icon
    navigate(`/blog-details/${id}`); //redirected to blog details url for editing it new url and page is there for it, id is also passed
  };

  const handleDelete = async () => { //delete blog function implemented at front end
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`); //delete this blog on the basis of id
      if (data?.success) { //if this sis success alert shown blog deleted
        toast.success("Buzz Deleted"); //toast notification
        window.location.reload(); //to refresh browser automatically so that we dont have to refresh after deletion
      }
    } catch (error) {
      console.log(error); //print error as it is on screen
    }
  };
  return (
    <Card
      sx={{ //card appearance properties
        width: "40%",
        margin: "auto",
        mt: 2, //top margin
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": { //in hover effect we will increase box shadow
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
      
    >
      {isUser && ( //if is user is true then show edit and delete functionality
        <Box display={"flex"}> {/*displayed edit and delete icon below*/}
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}> {/*margin left so it will get align on right side, on click we will execute handleEdit function */}
            <ModeEditIcon color="info" /> 
          </IconButton>
          <IconButton onClick={handleDelete}> {/*handledelete function called on its onclick */}
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={ //pass username here so it will apear on right of avatar icon
          <Avatar sx={{ bgcolor: lightBlue[800] }} aria-label="recipe">
            {username} 
          </Avatar>
        }
        title={username} //as a title on top of card header we need username so we will display it
        subheader={time} //created at property
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />  {/* image that we are receiving we will display it here*/}
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title} {/*to display title here destructured it from what recieved from user */}
        </Typography> 
        <Typography variant="body2" color="text.secondary">
          Description : {description}               {/*we will pass the blog description here it will be displayed*/}
        </Typography>
      </CardContent>
    </Card>
  );
}
