import React from "react"
import "./EditPlaces.scss"
import {useParams} from "react-router-dom"
import {places} from "../Places/UserPlaces"
import Input from "../../Shared/Components/FormElements/Input"
import { VALIDATOR_REQUIRE } from "../../Shared/Util/validators"
import Button from "../../Shared/Components/FormElements/Button"
const Editplace  = (props) =>
{
    const placeID = useParams().placeID
    const validPlaces = places.find(place => place.id === placeID)

    if(!validPlaces)
    {
        return(
            <div className = "center">
                <h2>
                    Could not find place !
                </h2>
            </div>
        )
    }
    return(
        <form className = "place-form">
            <Input 
                id = 'title'
                element = 'input'
                type = 'text'
                label = 'Title'
                validators = {[VALIDATOR_REQUIRE()]}
                errorText = "Please enter a valid title !"
                onInput = {() => {}}
                value = {validPlaces.title}
                valid = {true}
            />
            <Input 
                id = 'description'
                element = 'textarea'
                type = 'text'
                label = 'Description'
                validators = {[VALIDATOR_REQUIRE()]}
                errorText = "Please enter a valid description !"
                onInput = {() => {}}
                value = {validPlaces.description}
                valid = {true}
            />

            <Button type = "submit" disabled = {true}>
                UPDATE PLACE 
            </Button>
        </form>
    )



}



export default Editplace