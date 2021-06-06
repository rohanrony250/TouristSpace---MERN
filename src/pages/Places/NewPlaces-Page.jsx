import React from "react"
import "./NewPlaces.scss"
import Input from "../../Shared/Components/FormElements/Input"
import { VALIDATOR_REQUIRE } from "../../Shared/Util/validators"
 

const NewPlace = () =>
{
    return (
        <form className = "place-form">
            <Input 
                element = "input" 
                label = "Title" 
                validators = {[VALIDATOR_REQUIRE()]} 
                errorText = "Please enter a valid title"
            
            
            />
        </form>
    )
}


export default NewPlace;