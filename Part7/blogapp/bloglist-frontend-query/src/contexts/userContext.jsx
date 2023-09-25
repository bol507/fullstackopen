import { createContext, useReducer, useContext, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import * as api from '../requests';

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'ADD_USER':
      return { ...state, user: [...state.user, action.user] };
    default:
      return state;
  } //switch
}; //useReducer

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, {
    user: [],
  });

  const { data: user } = useQuery('user', api.getUser);
  useEffect(() => {
    if (user) {
        userDispatch({ type: 'SET_USER', user });
    }
  }, [user]);

  const setUserMutation = useMutation(api.setUser);

  function addUser(newUser) {
    try {
      setUserMutation.mutateAsync(newUSer);
      userDispatch({ type: 'ADD_USER', user: newUser });
    } catch (error) {
      console.error('Error add user:', error);
      throw new Error('Failed to add user');
    }
  }

  const clearUserMutation = useMutation(api.clearUser);

  function clearUser() {
    clearUserMutation.mutate();
    userDispatch({ type: 'SET_USER', user: null });
  }

  const loginMutation = useMutation(api.login,{
    onSuccess: (data) => {
        
        setUserMutation.mutateAsync(data);
        userDispatch({ type: 'ADD_USER', user: data });
      },
  })

  async function loginUser(newUser) {
    try {
      await loginMutation.mutateAsync(newUser);
    } catch (error) {
      console.error('Error login:', error);
      throw new Error('Failed login');
    }
  }

  const contextValue = {
    userState,
    userDispatch,
    addUser,
    clearUser,
    loginUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}; //UserContextProvider

export const useUser = () => {
  const { userState } = useContext(UserContext);
  return { user: userState.user };
}; //useUser

export default UserContext;
