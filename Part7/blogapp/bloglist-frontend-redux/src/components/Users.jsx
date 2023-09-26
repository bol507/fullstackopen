import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
const Users = ({blogs}) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    useEffect(() => { 
        dispatch(initializeUsers())  
        
      }, []);

    const blogsPerUser = {};

    blogs.forEach((blog) => {
      const username = blog.user.username;
      if (blogsPerUser[username]) {
        blogsPerUser[username]++;
      } else {
        blogsPerUser[username] = 1;
      }
    });

    

    return (
        <div>
          <h2>Users</h2>
          <h3>blogs created</h3>
          {users.map((user) => (
            <div>
              <span>{user.name} </span> 
              <span> {blogsPerUser[user.username] || 0}</span>
              
            </div>
          ))}

        </div>        
    )//return
}//Users

export default Users