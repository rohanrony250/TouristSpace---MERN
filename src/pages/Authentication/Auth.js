import React from "react"
import Card from "../../Shared/Components/UI-Elements/Card/Card"
import Input from "../../Shared/Components/FormElements/Input"
import "./Auth.scss"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../Shared/Util/validators"
import { useForm } from "../../Shared/Hooks/form-hook" 
import Button from "../../Shared/Components/FormElements/Button"

const Auth = () =>
{
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    }, false)

    const authSubmitHandler = (event) =>
    {
        event.preventDefault()
        console.log(formState.inputs)
    }
    return(
        <Card className = "authentication">
            <h2>
                Login Required
            </h2>
            <hr />
            <form onSubmit = {authSubmitHandler}>
                <Input 
                
                    element = "input"
                    id = "email"
                    type = "email"
                    label = "E-mail"
                    validators = {[VALIDATOR_EMAIL()]}
                    errorText = "Please enter a valid email address...."
                    onInput = {inputHandler}
                />
                <Input 
                    
                    element = "input"
                    id = "password"
                    type = "password"
                    label = "Password"
                    validators = {[VALIDATOR_MINLENGTH(8)]}
                    errorText = "Please enter a valid password of atleast 8 characters..."
                    onInput = {inputHandler}
                />
                <Button type = "submit" disabled = {!formState.isValid}>LOGIN</Button>
            </form>
        </Card> 
    )
}


export default Auth