import React, { useState, useEffect } from "react"; //this page is for my blogs function or feature it is my blogs page, useEffect is a life cyle method
import axios from "axios";
import BlogCard from "../components/BlogCard"; //to display blogs on this page
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]); //state created initially useState empty array
  //we make it a functional component by rafce
  //get user blogs, function to get user blogs created below
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId"); //either destructure id or store it in a variable since it will be dynamic, we will get id from localstorage since we are saving it there at time of login
      const { data } = await axios.get(`${process.env.URL}/api/v1/blog/user-blog/${id}`); //destructuring of data recieved from axios get request send to fetch blogs of that user on the api or network which we created in backend
      if (data?.success) { //if data is found then
        setBlogs(data?.userBlog.blogs); //set blogs with data in data there is userBlog from blog controller function to get user blogs, so set blogs as that data, we will get blog from userBlogs
      }
    } catch (error) {
      console.log(error); //display error on terminal or console
    }
  };

  useEffect(() => {
    getUserBlogs(); //call the function in useEffect hook // Call the function to fetch user blogs when component mounts
  }, []); //pass array for dependencies if any // Empty dependency array ensures this runs only once
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? ( //ternary if else condition if blog length>0 then we print and display these blogs
        blogs.map((blog) => ( //to actually display and print blogs or blogcard on screen without this we will just get it but after getting we have to print it too
          <BlogCard
            id={blog._id} //to get blog ID
            isUser={true} //so that only that user has access to edit and delete his own post
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (//else we print this message as a part of that ternary statement
        <h1 Align = "center">You have not created any buzz yet! Create a buzz now!</h1>
      )}
    </div>
  );
};

export default UserBlogs;
