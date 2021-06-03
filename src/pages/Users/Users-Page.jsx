import React from "react"
import UsersList from "../../components/Users-List/Users-List-Component"

const Users = () =>
{
    const Users =
    [
        {
            id: "1", name: "Thomas George", image: "https://picsum.photos/500", places: "3"
        }
    ];

    return(
        <UsersList items = {Users}/>
    )

}


export default Users;


