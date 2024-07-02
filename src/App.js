//in app.js we add all the components and pages of our client side and also route path of it which page or component belongs to which route path
import Header from "./components/Header"; //to import header or navbar component
import { Routes, Route } from "react-router-dom"; //to perform routing in our application
import Blogs from "./pages/Blogs"; //blogs pages wil be our home page 
import Login from "./pages/Login"; //to import login page
import Register from "./pages/Register"; //to import register page
import UserBlogs from "./pages/UserBlogs"; //user blogs or my blogs page
import CreateBlog from "./pages/CreateBlog"; //create blog page imported
import BlogDetails from "./pages/BlogDetails"; //blogdetails page or edit page
import { Toaster } from "react-hot-toast"; //for toast notification
function App() {
  return (
    <>
      <Header /> 
      <Toaster /> {/*for toast notifications */}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} /> {/* user blogs page routed to my-blogs url*/}
        <Route path="/blog-details/:id" element={<BlogDetails />} />{/*end points for each page or component set , this route is for blog details page which is the edit page on basis of id*/}
        <Route path="/create-blog" element={<CreateBlog />} /> {/*route created for create blog page or page routed to that route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
