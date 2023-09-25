import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs'

const blogSlice  = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state,action){
            return action.payload
        },
        appendBlog(state,action){
            state.push(action.payload)
        }
    }//reducers
})//blogReducer

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }//return
}//initializeBlogs

export const addBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
    }//return
}//createBlog

export default blogSlice.reducer
