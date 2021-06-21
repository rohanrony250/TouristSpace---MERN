import React, { useState, useContext } from "react"
import Card from "../../Shared/Components/UI-Elements/Card/Card"
import Input from "../../Shared/Components/FormElements/Input"
import "./Auth.scss"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/Util/validators"
import { useForm } from "../../Shared/Hooks/form-hook" 
import Button from "../../Shared/Components/FormElements/Button"
import {AuthContext} from "../../Shared/Components/Context/auth-context"
const Auth = () =>
{
    const auth = useContext(AuthContext)
    const [LoginMode, setIsLoginMode] = useState(true)
    const [formState, inputHandler, setFormData] = useForm({
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
        auth.login()
        console.log(formState.inputs)
    }

    const switchModeHandler = () =>
    {
        if(!LoginMode)
        {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }  
        else{
            setFormData({
                ...formState.inputs,
                name:{
                    value: "",
                    isValid: false,
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }



    return(
        <Card className = "authentication">
            <h2>
                Login Required
            </h2>
            <hr />
            <form onSubmit = {authSubmitHandler}>
                {
                    !LoginMode && (
                        <Input 
                            element = "input"
                            id = "name"
                            type = "text"
                            label = "Name"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText = "Please enter a name"
                            onInput = {inputHandler}
                        />
                    )
                }
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
                <Button type = "submit" disabled = {!formState.isValid}>{LoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
                <Button type = "submit" inverse onClick = {switchModeHandler}>Switch To {LoginMode ? 'Sign Up' : 'Login'} Mode</Button> 
            </form>
        </Card> 
    )
}


export default Auth