import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user"

const usersSlice = createSlice({
    name:'users',
    initialState:[],
    reducers:{
        setUsers: (state, action) => {
            return action.payload
          },
    }//reducers
})//usersSlice

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getUsers()
        dispatch(setUsers(users))
    }//return
}//initializeUsers

export default usersSlice.reducer