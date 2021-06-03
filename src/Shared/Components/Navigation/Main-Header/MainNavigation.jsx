import React from "react"
import MainHeader from "../Main-Header/MainHeader"
import NavLinks from "../Nav-Links/NavLinks"
import {Link} from "react-router-dom"
import SideDrawer from "../SideDrawer/SideDrawer"
import "./MainNavigation.scss"


const MainNavigation = (props) =>
{
    return(
        <React.Fragment>
            <SideDrawer>
                <nav className = "main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className = "main-navigation__menu-btn">
                    <span />
                    <span />
                    <span />
                </button>
                
                <h1 className = "main-navigation__title">
                    <Link to = "/">FindFriends</Link>
                </h1>
                <nav className = "main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}



export default MainNavigation