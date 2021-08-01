import React, { useState, useContext } from "react"
import Card from "../../Shared/Components/UI-Elements/Card/Card"
import Input from "../../Shared/Components/FormElements/Input"
import "./Auth.scss"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/Util/validators"
import { useForm } from "../../Shared/Hooks/form-hook" 
import Button from "../../Shared/Components/FormElements/Button"
import {AuthContext} from "../../Shared/Components/Context/auth-context"
import ErrorModal from "../../Shared/Components/UI-Elements/Modal/ErrorModal"
import LoadingState from "../../Shared/Components/UI-Elements/LoadingSpinner"
const Auth = () =>
{
    const auth = useContext(AuthContext)
    const [LoginMode, setIsLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


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

    const authSubmitHandler = async (event) =>
    {
        event.preventDefault()
        setIsLoading(true);

        if(LoginMode)
        {
            try
            {
                
                const response = await fetch('http://localhost:5000/api/users/login', 
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : "application/json"
                    },
                    body : JSON.stringify({ 
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    })
                })


                const responseData = await response.json();
                if(!response.ok)
                {
                    throw new Error(responseData.message);
                }
                // console.log(responseData);
                setIsLoading(false)
                auth.login()
            }
            catch(err)
            {
                setIsLoading(false)
                // console.log(err);
                setError(err.message || "Something went wrong, please try again.");
            }
        }
        else
        {

            try
            {
                
                const response = await fetch('http://localhost:5000/api/users/signup', 
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : "application/json"
                    },
                    body : JSON.stringify({
                        name : formState.inputs.name.value, 
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    })
                })


                const responseData = await response.json();
                if(!response.ok)
                {
                    throw new Error(responseData.message);
                }
                // console.log(responseData);
                setIsLoading(false)
                auth.login()
            }
            catch(err)
            {
                setIsLoading(false)
                // console.log(err);
                setError(err.message || "Something went wrong, please try again.");
            }
        }

        
        

        
        // console.log(formState.inputs)
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
        setIsLoginMode(prevMode => !prevMode);
    }

    const errorHandler = () =>
    {
        setError(null);
    }


    return(
        <>
        <ErrorModal error = {error} onClear = {errorHandler}/>
        <Card className = "authentication">
            {isLoading && <LoadingState asOverlay/>}
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
            </form>
            <Button type = "submit" inverse onClick = {switchModeHandler}>Switch To {LoginMode ? 'Sign Up' : 'Login'} Mode</Button> 
        </Card> 
        </>
    )
}


export default Auth