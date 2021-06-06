import React from "react"
import "./NewPlaces.scss"
import Input from "../../Shared/Components/FormElements/Input"



const NewPlace = () =>
{
    return (
        <form className = "place-form">
            <Input element = "input" label = "Title"/>
        </form>
    )
}


export default NewPlace;