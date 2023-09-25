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
        },
        likesBlog(state,action){
            const id = action.payload.id
            const updatedBlog = state.map(b => {
                if(b.id === id){
                   return { 
                        ...b,
                        likes: b.likes + 1
                    }
                }
                return b
            })//updatedBlog
            return updatedBlog;
        },//likesBlog
    }//reducers
})//blogReducer

export const { setBlogs, appendBlog, likesBlog } = blogSlice.actions

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

export const updateBlog = content => {
    return async dispatch => {
        const updatedBlog = await blogService.update(content)
        dispatch(likesBlog(updatedBlog))
    }
}//updateBlog

export const deleteBlog = blogId => {
    return async () => {
        const res = await blogService.remove(blogId)
        initializeBlogs()//call 
    }
}//deleteBlog

export default blogSlice.reducer
