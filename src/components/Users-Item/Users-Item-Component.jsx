import React from "react"
import Avatar from "../../Shared/Components/UI-Elements/Avatar/Avatar"
import Card from "../../Shared/Components/UI-Elements/Card/Card"
import {Link} from "react-router-dom"
import "./Users-Item-Styles.scss"


const UsersItem = (props) =>
{
    return(
        <div>
            <li className = "user-item">
                <Card className = "user-item__content">
                    <Link to = {`/${props.id}/places`}>
                        <div className = "user-item__image">
                            <Avatar image = {props.image} alt = {props.name} />
                        </div>
                        <div className = "user-item__info">
                            <h2>
                                {props.name}
                            </h2>
                            <h3>
                                {props.placescount} {props.placescount === 1 ? "Place" : "Places"}
                            </h3>
                        </div>
                    </Link>
                </Card>
            </li>
        </div>
    )
}


export default UsersItem;