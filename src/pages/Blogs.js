import React, { useState, useEffect } from "react"; //usestate to hold blogs and its data or keep track of it, useeffect is a life cycle method so that we can get all blogs at initial time
import axios from "axios"; //using axios we send network request
import BlogCard from "../components/BlogCard";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);   //state creation initially useState has empty array[] we will fulfill all blogs here later
  //function to get all blogs
  const getAllBlogs = async () => {
    try {           //try catch block to handle response and error
      const { data } = await axios.get("/api/v1/blog/all-blog"); //get all blogs from that api by axios get request and destructure that data
      if (data?.success) { //conditionally check if we get the data it is success and we get blogs
        setBlogs(data?.blogs); //then we will set the data using setblogs since initially ke kept array empty now it will be filled
      }//in blogcontroller in get all blogs we have passed blogs at the end that willbe recieved here
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { //we call it here
    getAllBlogs();
  }, []);
  return (
    <div>
      {blogs && //if blogs found then we map get them and return them 
        blogs.map((blog) => (
          <BlogCard //to print blogcards on screen
            id={blog?._id}  //to pass blog id conditionally bcoz we can only delete or edit our own blog
            isUser={localStorage.getItem("userId") === blog?.user?._id} //we are checking if userid present in local storage is equivalent to user id of blog
            title={blog?.title} //get from blogmodel
            description={blog?.description} // "
            image={blog?.image} // " we have done optional chaining here to avoid delay else app will crash
            username={blog?.user?.username} //get username from blog.user.username since we populated user in blog
            time={blog.createdAt} //to show time in subheader when blog was created, createdAt is a property
          />
        ))}
    </div>
  );
};

export default Blogs;
