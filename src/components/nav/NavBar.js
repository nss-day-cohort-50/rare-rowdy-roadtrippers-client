import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myPosts">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag Management</Link>
            </li>
            {
                (localStorage.getItem("token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
