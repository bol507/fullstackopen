import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: 'Initial notification message',
        duration: 0,
    },
    reducers: {
        setNotification(state, action) {
            const { message, duration } = action.payload
            return { message, duration }
        },
        clearNotification() {
            return { message: '', duration: 0 }
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, duration) => {
    return (dispatch) => {
      dispatch(setNotification({ message, duration }))
  
      setTimeout(() => {
        dispatch(clearNotification())
      }, duration * 1000);
    }
  }

export default notificationSlice.reducer;