import { createContext, useReducer, useContext, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import * as api from '../requests';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOG':
      return { ...state, blogs: action.blogs };
    case 'ADD_BLOG':
      return { ...state, blogs: [...state.blogs, action.blog] };
    case 'UPDATE_BLOG':
      const updatedBlogs = state.blogs.map((blog) => {
        if (blog.id === action.blog.id) {
          return action.blog;
        }
        return blog;
      });
      return { ...state, blogs: updatedBlogs };
    default:
      return state;
  }
}; //userReducer

export const BlogContext = createContext();

export const BlogContextProvider = (props) => {
  const [blogState, blogDispatch] = useReducer(blogReducer, {
    blogs: [],
    isLoading: false,
  });

  const { data: blogs, isLoading } = useQuery('blogs', api.getAll);
  useEffect(() => {
    if (blogs) {
      blogDispatch({ type: 'SET_BLOG', blogs });
    }
  }, [blogs]);

  const createBlogMutation = useMutation(api.createBlog, {
    onSuccess: (data) => {
      blogDispatch({ type: 'ADD_BLOG', blog: data });
    },
  });

  const updateBlogMutation = useMutation(api.updateBlog, {
    onSuccess: (data) => {
      blogDispatch({ type: 'UPDATE_BLOG', blog: data });
     // blogQueryCache.invalidateQueries('blogs'); // Invalidate blogs query to trigger refetch
    },
  });

  async function addBlog(newBlog) {
    try {
      await createBlogMutation.mutateAsync(newBlog);
    } catch (error) {
      console.error('Error adding blog:', error);
      throw new Error('Failed to add blog');
    }
  }

  async function updateBlog(updatedBlog) {
    try {
      await updateBlogMutation.mutateAsync(updatedBlog);
    } catch (error) {
      console.error('Error updating blog:', error);
      throw new Error('Failed to update blog');
    }
  }
  
  const contextValue = {
    blogState,
    blogDispatch,
    isLoading,
    addBlog: addBlog,
    updateBlog: updateBlog,
  };

  return (
    <BlogContext.Provider
      value={contextValue}
    >
      {props.children}
    </BlogContext.Provider>
  );
}; //BlogContextProvider

export const useBlogDispatch = () => {
  const { blogDispatch } = useContext(BlogContext);
  return blogDispatch;
};

export const useBlogs = () => {
  const { blogState, isLoading } = useContext(BlogContext);
  return { blogs: blogState.blogs, isLoading };
};

export default BlogContext;
