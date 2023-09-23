import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
	duration:0,
  type: '',
};
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
			state.duration = action.payload.duration
			state.type = action.payload.type
    },
		clearNotification(state) {
			state.message = '';
			state.duration = 0;
			state.type = '';
	},
  }, //reducers
});//notificationSlice

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, duration, type) => {
	return (dispatch) => {
		dispatch(setNotification({ message, duration, type }))

		setTimeout(() => {
			dispatch(clearNotification())
		}, duration * 1000);
	}
}//showNotification

export default notificationSlice.reducer;