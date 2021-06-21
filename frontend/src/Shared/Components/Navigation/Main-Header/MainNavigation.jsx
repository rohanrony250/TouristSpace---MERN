import React, {useState, useEffect} from "react"
import MainHeader from "../Main-Header/MainHeader"
import NavLinks from "../Nav-Links/NavLinks"
import Backdrop from "../../UI-Elements/Background/Backdrop"
import {Link} from "react-router-dom"
import SideDrawer from "../SideDrawer/SideDrawer"
import "./MainNavigation.scss"


const MainNavigation = (props) =>
{
    const [drawer,setDrawer] = useState(false);
    const drawerOpen = () =>
    {
        setDrawer(true);
    }
    const drawerClose = () =>
    {
        setDrawer(false)
    } 
    return(
        <React.Fragment>
            {drawer && <Backdrop onClick = {drawerClose}/>}
            <SideDrawer show = {drawer} onClick = {drawerClose}>
                <nav className = "main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className = "main-navigation__menu-btn" onClick = {drawerOpen}>
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