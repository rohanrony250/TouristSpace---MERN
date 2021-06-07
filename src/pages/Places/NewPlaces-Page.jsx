import React, {useCallback, useReducer} from "react"
import "./NewPlaces.scss"
import Input from "../../Shared/Components/FormElements/Input"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../Shared/Util/validators"
import Button from "../../Shared/Components/FormElements/Button"
import { useForm } from "../../Shared/Hooks/form-hook"






const NewPlace = () =>
{
    const [formState , inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description : {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    )
    
    



    const placeSubmitHandler = (event) =>
    {
        event.preventDefault()
        console.log(formState.inputs)
    }

  


    return (
        <form className = "place-form" onSubmit = {placeSubmitHandler}>
            <Input 
                element = "input" 
                label = "Title" 
                validators = {[VALIDATOR_REQUIRE()]} 
                errorText = "Please enter a valid title"
                id = "title"
                onInput = {inputHandler}
            />
            <Input 
                element = "textarea"
                id = "description" 
                label = "Description" 
                validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                errorText = "Minimum of 5 characters required !"
                onInput = {inputHandler}
            
            /> 
            <Input 
                element = "input"
                id = "address" 
                label = "Address" 
                validators = {[VALIDATOR_REQUIRE()]} 
                errorText = "Please enter the correct address !"
                onInput = {inputHandler}
            
            /> 
            <Button type = "submit" disabled = {!formState.isValid}>ADD PLACE</Button>
        </form>
    )
}


export default NewPlace;