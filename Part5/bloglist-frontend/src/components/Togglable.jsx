import {useState, forwardRef, useImperativeHandle} from "react";

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState()
    
    const hidenWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, ()=>{
        return {toggleVisibility}
    })

    return (
        <div>
            <div style={hidenWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}//function arrow
)//forwarref

export default Togglable