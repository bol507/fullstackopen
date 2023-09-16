import React from "react"
import "./Navbar.css"

const Navbar = ({ handleLogout, handleSectionCreateBlog, handleSectionHome }) => {

    return (
        <nav className="wrapper-nav">
            <div className="wrapper-nav-items">
                
                    <a className="nav-title" onClick={handleSectionHome}>Blogs</a>
                   {/* <a className="nav-item" onClick={handleSectionCreateBlog}>
                        Create a new blog
                        </a> */}        
                
                
                <a href="#" className="nav-item nav-sign-out" onClick={handleLogout} >Sign out</a>
            </div>
        </nav>
    )

}

export default Navbar