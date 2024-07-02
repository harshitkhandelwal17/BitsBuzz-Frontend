import { createSlice, configureStore } from "@reduxjs/toolkit"; //we have to bind this store of redux with our react app
//createSlice is used to create actions, we created a slice object below with name authSlice
const authSlice = createSlice({
  name: "auth", //since slice is related to auth
  initialState: { //what all values you need initally
    isLogin: false, //we need to check login related so initially isLogin is false
  },
  reducers: {
    login(state) { //login function, state as a parameter, we can change initialState values using it
      state.isLogin = true; //when login function is called our state of isLogin will be true
    },
    logout(state) {
      state.isLogin = false; //when logout function is called isLogin will again turn to false
    },
  },
});//our slice is ready now we have to export it as a action
export const authActions = authSlice.actions; //to export auth slice actions

export const store = configureStore({
  reducer: authSlice.reducer, //put reducer(actions) in store and export store
});

//so with this our function is ready using which we are handling login state globally