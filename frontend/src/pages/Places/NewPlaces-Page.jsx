import React, {useCallback, useContext, useReducer} from "react"
import {useHistory} from "react-router-dom"
import "./NewPlaces.scss"
import Input from "../../Shared/Components/FormElements/Input"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../Shared/Util/validators"
import Button from "../../Shared/Components/FormElements/Button"
import { useForm } from "../../Shared/Hooks/form-hook"
import {useHttpClient} from "../../Shared/Hooks/http-hook"
import {AuthContext} from "../../Shared/Components/Context/auth-context"
import ErrorModal from "../../Shared/Components/UI-Elements/Modal/ErrorModal"
import LoadingSpinner from "../../Shared/Components/UI-Elements/LoadingSpinner"


const NewPlace = () =>
{

    const {isLoading, clearError, sendRequest, error} = useHttpClient()
    const auth = useContext(AuthContext)
    const history = useHistory()
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
    
    



    const placeSubmitHandler = async (event) =>
    {
        event.preventDefault()
        try
        {
            await sendRequest('http://localhost:5000/api/places', 'POST', JSON.stringify({
                title : formState.inputs.title.value,
                description : formState.inputs.description.value,
                address : formState.inputs.address.value,
                creator : auth.userId,
            }),
            {
                'Content-Type' : 'application/json'
            }
            
            
            
            )
            
            history.push('/')
            
        }
        catch(err)
        {

        }
    }

  


    return (
        <>
            <ErrorModal error = {error} onClear = {clearError} />
            <form className = "place-form" onSubmit = {placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
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
        </>
    )
}


export default NewPlace;