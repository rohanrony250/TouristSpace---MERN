import React from "react"
import PlaceList from "../../components/Places-List/PlaceList"
import {useParams} from "react-router-dom"



export const places = [
    {
        id: 'p1',
        title: 'Kuwait Towers',
        description: 'The Kuwait Towers are a group of three slender towers in Kuwait City.',
        imageUrl: 'https://images.unsplash.com/photo-1611469950170-b492451694ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        address: 'Arabian Gulf St, Kuwait City',
        location: {
            lat: 29.389714,
            lng: 48.0011012
        },
        creator: 'p1'
    },
    {
        id: 'p2',
        title: 'Kuwait Towers',
        description: 'The Kuwait Towers are a group of three slender towers in Kuwait City.',
        imageUrl: 'https://images.unsplash.com/photo-1611469950170-b492451694ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        address: 'Arabian Gulf St, Kuwait City',
        location: {
            lat: 29.389714,
            lng: 48.0011012
        },
        creator: 'p2'
    }


]
const UserPlaces = () =>
{
    

    const userID = useParams().uID
    const userPlaces = places.filter(place => place.creator === userID)

    return(
        <PlaceList items = {userPlaces} />
    )
}



export default UserPlaces;
