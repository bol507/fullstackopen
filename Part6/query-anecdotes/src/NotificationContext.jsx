import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "SET_MESSAGE":
            return { ...state, message: action.message }
        case "RESET_MESSAGE":
            return { ...state, message: "" }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {
			message: '',
		})

		useEffect(() => {
			if (notification.message) {
				const timer = setTimeout(() => {
					notificationDispatch({ type: 'RESET_MESSAGE' });
				}, 5000);
	
				return () => clearTimeout(timer);
			}
		}, [notification])
  
    return (
      <NotificationContext.Provider value={{notification, notificationDispatch} }>
        {props.children}
      </NotificationContext.Provider>
    )
  }

export const useNotificationValue = () => {
	const { notification } = useContext(NotificationContext)
	console.log('notifiction',notification)
	return notification
}

export const useNotificationDispatch = () => {
	const { notificationDispatch } = useContext(NotificationContext)
	return notificationDispatch
}

export default NotificationContext