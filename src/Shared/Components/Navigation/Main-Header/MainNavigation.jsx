import React from "react"
import MainHeader from "../Main-Header/MainHeader"
import {Link} from "react-router-dom"
import "./MainNavigation.scss"


const MainNavigation = (props) =>
{
    return(
        <MainHeader>
            <button className = "main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            
            <h1 className = "main-navigation__title">
                <Link to = "/">FindFriends</Link>
            </h1>
            <nav>
                ...
            </nav>
        </MainHeader>
    )
}



export default MainNavigation