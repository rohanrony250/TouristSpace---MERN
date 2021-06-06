import React, {useReducer}from "react"
import "./Input.scss"
import { validate } from "../../Util/validators"



const InputReducer = (state, action) =>
{
    switch(action.type)
    {
        case 'CHANGE':
            return{
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return{
                ...state,
                isTouched: true
            }
        default: 
            return state;
    
    }
}



const Input = (props) =>
{
    const [inputState, dispatch] = useReducer(InputReducer, {value: '', isValid: false, isTouched: false})
    const changeHandler = (event) =>
    {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators})
    }
    const touchHandler = () =>
    {
        dispatch({

            type: 'TOUCH',


        })
    }
    const element = (props.element === 'input') ? 
        <input id = {props.id} type = {props.type} onBlur = {touchHandler} placeholder = {props.placeholder} onChange = {changeHandler} value = {inputState.value}/> 
        : <textarea onChange = {changeHandler} id = {props.id} rows = {props.rows || 3} value = {inputState.value} onBlur={touchHandler}/>
    return(
        <div className = {`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}> 
            <label htmlFor={props.id}>
                {props.label}    
            </label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}



export default Input