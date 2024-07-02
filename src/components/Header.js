import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //using useSelector we will manage global state, usedispatch to call login and logout functions from redux store
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Header = () => {
  // global state manage
  let isLogin = useSelector((state) => state.isLogin);  //we will get the global state of islogin
  isLogin = isLogin || localStorage.getItem("userId"); //either of the condition works user will stay logged in, to persist login
  const dispatch = useDispatch(); //variable of useDispatch since its a hook
  const navigate = useNavigate(); //variable created of useNavigate
  //state to manage number sequence, normal states here not global
  const [value, setValue] = useState();

  //logout function called on onclick of logout button
  const handleLogout = () => {
    try {
      dispatch(authActions.logout()); //logout function called or dispatched
      toast.success("Logout Successfully"); //alert or notif shown on screen toast notif
      navigate("/login"); //redirected to login page
      localStorage.clear(); //clear local storage data after logout such as user id etc
    } catch (error) {
      console.log(error); //in case any error show on console
    }
  };
  return (
    <> {/* AppBar component for the top navigation bar */}
      <AppBar position="sticky" style={{ background: '#2E3B55' }}>
        <Toolbar>{/* Typography component for the website title */}
          <Typography variant="h4" color="#ffc107">BitsBuzz(0/1)</Typography>
          {isLogin && (//this tab menu is only shown when isLogin is true, that means when user has logged in
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              {/* Tabs component for navigation links */}
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}  /*on change handles event when user clicks one of the below tabs a event happens */
              >
                <Tab label="All Buzz" LinkComponent={Link} to="/blogs" sx={{color : '#ffc107'}} />  {/*redirected to blogs page*/}
                <Tab label="My Buzz" LinkComponent={Link} to="/my-blogs" sx={{color : '#ffc107'}}/> {/*redirected to User Blogs page*/}
                <Tab
                  sx={{color : '#ffc107'}} 
                  label="Create Buzz"
                  LinkComponent={Link} //we have routed this tab to create-blog route
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && ( //show login and register only when user has not logged in or isLogin is false
              <>{/* Buttons for Login and Register when user is not logged in */}
                <Button
                  sx={{ margin: 1, color: "#ffc107" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "#ffc107" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && ( //only show logout when user has logged in or isLogin is true
              <Button onClick={handleLogout} sx={{ margin: 1, color: "#ffc107" }}> {/* Button for Logout when user is logged in, on its Onclick handlelogout function is called*/}
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
