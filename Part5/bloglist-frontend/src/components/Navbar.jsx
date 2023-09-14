import React from "react"
import "./Navbar.css"

const Navbar = ({handleLogout}) => {

    return (
        <nav className="wrapper-nav">
            <div className="wrapper-nav-items">
                <div>
                    <span className="nav-title">Blogs</span>
                </div>
                <a href="#" className="sign-out" onClick={handleLogout} >Sign out</a>  
            </div>
        </nav>
    )

}

export default Navbar