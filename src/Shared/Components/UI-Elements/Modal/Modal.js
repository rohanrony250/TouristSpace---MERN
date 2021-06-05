import React from "react"
import ReactDOM from "react-dom"
import "./Modal.scss"


const ModalOverlay = (props) =>
{
    const content = (
        <div className = {`modal ${props.className}`} style = {props.style}>

        </div>
    )

    return(
        ReactDOM.createPortal(content , document.getElementById('modal-hook'))
    )
}

const Modal = (props) =>
{

}

export default Modal