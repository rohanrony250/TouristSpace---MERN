import React, {useContext} from "react"
import {NavLink} from "react-router-dom"
import {AuthContext} from "../../Context/auth-context"
import "./NavLinks.scss"

const NavLinks = props =>
{
    const auth = useContext(AuthContext)
    return <ul className = "nav-links">
        <li>
            <NavLink to = "/" exact>
                ALL USERS
            </NavLink>
        </li>
        {auth.isLoggedIn &&
            <li>
                <NavLink to = "/1/places">
                    MY PLACES
                </NavLink>
            </li>
        }
        
        {
            auth.isLoggedIn &&
            <li>
                <NavLink to = "/places/new">
                    ADD PLACE
                </NavLink>            
            </li>
        }
        {
            !auth.isLoggedIn &&
            <li>
                <NavLink to = "/auth">
                    AUTHENTICATE
                </NavLink>            
            </li>
        }
        {
            auth.isLoggedIn &&
            <li>
                <NavLink to = "/auth" onClick = {auth.logout}>
                    LOGOUT
                </NavLink>            
            </li>
        }
        
    </ul>
}

export default NavLinks