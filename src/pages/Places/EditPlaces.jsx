import React from "react"
import "./EditPlaces.scss"
import {useParams} from "react-router-dom"
import {places} from "../Places/UserPlaces"
import Input from "../../Shared/Components/FormElements/Input"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/Util/validators"
import Button from "../../Shared/Components/FormElements/Button"
import { useForm } from "../../Shared/Hooks/form-hook"
const Editplace  = (props) =>
{
    const placeID = useParams().placeID
    // console.log(placeID)
    const validPlaces = places.find(place => place.id === placeID)
    console.log(validPlaces)
    const [formState , inputHandler] = useForm({

        title: {
            value: validPlaces.title,
            isValid: true
        },
        description: {
            value: validPlaces.description,
            isValid: true
        }
    }, true)

    // console.log(formState.inputs)

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
                onInput = {inputHandler}
                value = {formState.inputs.title.value}
                valid = {formState.inputs.title.isValid}
            />
            <Input 
                id = 'description'
                element = 'textarea'
                type = 'text'
                label = 'Description'
                validators = {[VALIDATOR_MINLENGTH(5)]}
                errorText = "Please enter a valid description !"
                onInput = {inputHandler}
                value = {formState.inputs.description.value}
                valid = {formState.inputs.description.isValid}
            />

            <Button type = "submit" disabled = {!formState.isValid}>
                UPDATE PLACE 
            </Button>
        </form>
    )



}



export default Editplace