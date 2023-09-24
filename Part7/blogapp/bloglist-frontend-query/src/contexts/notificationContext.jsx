import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state,action) => {
    switch(action.type){
        case "SET_MESSAGE":
            return {...state, message: action.message }
        case "RESET_MESSAGE":
            return{...state, message:''}
        default:
            return state
    }//switch
}//notificationReducer

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer,{
        message: '',
    })

    useEffect(()=>{
        if (notification.message){
            const timer = setTimeout(()=>{
                notificationDispatch({type: 'RESET_MESSAGE'})
            }, 5000)
            return () => clearTimeout(timer)
        }
    },[notification])//useEffect
    
    return (
        <NotificationContext.Provider value={{ notification,notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )//return
}//NotificationContextProvider

export const useNotificationValue = () => {
    const { notification } = useContext(NotificationContext)
    return notification
}//useNotificationValue

export const useNotificationDispatch = () => {
    const { notificationDispatch } = useContext(NotificationContext)
    return notificationDispatch
}//useNotificationDispatch

export default NotificationContext