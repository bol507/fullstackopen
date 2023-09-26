import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login"
import userService from "../services/user"


const userSlice  = createSlice({
    name:'user',
    initialState:[],
    reducers:{
        setUser: (state, action) => {
            return action.payload
          },

    }//reducers
})//createSlice

export const { setUser } = userSlice.actions

export const initializeUser = () => {
    return async (dispatch) => {
        const user = await userService.getUser()
        dispatch(setUser(user))
    }//return
}//initializeUser

export const loginUser = content => {
    return async (dispatch) => {
        const user = await loginService.login(content)
        await userService.setUser(user)
        dispatch(setUser(user))
    }
}//login

export const removeUser = ()=> {
    return (dispatch) => {
        userService.clearUser()
        dispatch(setUser(null))
    }
}//removeUser


export default userSlice.reducer
