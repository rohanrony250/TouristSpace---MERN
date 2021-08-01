import React from "react"
import "./Users-List-Styles.scss"
import UsersItem from "../Users-Item/Users-Item-Component"

const UsersList = (props) =>
{
    if(props.items.length === 0)
    {
        return(
            <div className = "center">
                <h2>
                    No users found.
                </h2>
            </div>
        )
    }
    
    
    return(
        <ul className = "users-list" > 
            {
                props.items.map((user) => (
                    <UsersItem 
                        
                        key = {user.id}
                        id = {user.id}
                        image = {user.image}
                        name = {user.name}
                        placescount = {user.places.length}
                    />
                ))
            }
        </ul>
    )
}


export default UsersList;