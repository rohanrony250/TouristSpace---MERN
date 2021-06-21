import React, {useState, useContext} from "react"
import Card from "../../Shared/Components/UI-Elements/Card/Card"
import "./PlaceItem.scss"
import Button from "../../Shared/Components/FormElements/Button"
import Modal from "../../Shared/Components/UI-Elements/Modal/Modal"
import Map from "../../Shared/Components/UI-Elements/Map/Map"
import {AuthContext} from "../../Shared/Components/Context/auth-context"
const PlaceItem = props =>
{ 
    const auth = useContext(AuthContext)
    const [showMap, setShowMap] = useState(false)
    const [showModal, setshowModal] = useState(false)
    const openMap = () => setShowMap(true)
    const closeMap = () => setShowMap(false)
    const showDeleteWarningHandler = () =>
    {
        setshowModal(true)
    }
    const cancelDeleteHandler = () =>
    {
        setshowModal(false)
    }
    const confirmDeleteHandler = () =>
    {
        setshowModal(false)
        console.log('DELETING....')
    }
    return(
        <React.Fragment>
            <Modal 
                show = {showMap}
                onCancel = {closeMap}
                header = {props.address}
                contentClass = "place-item__modal-content"
                footerClass = "place-item__modal-actions"
                footer = {<Button onClick = {closeMap}>CLOSE</Button>}
            >
                <div className = "map-container">
                    <Map coordinates = {props.coordinates}/>
                </div>
            </Modal>
            <Modal show = {showModal}  header = "Are you sure ?" footerClass = "place-item__modal-actions" footer = {
                <>
                    <Button inverse onClick = {cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick = {confirmDeleteHandler}>DELETE</Button>
                </>
            }>
                <p>
                    Do you want to proceed and delete this place? Please remember it can't be undone thereafter.
                </p>
            </Modal>
            <li className = "place-item">
                <Card className = "place-item__content">
                    <div className = "place-item__image">
                        <img src={props.image} alt = {props.title} />
                    </div>

                    <div className = "place-item__info">
                        <h2>
                            {props.title}
                        </h2>
                        <h3>
                            {props.address}
                        </h3>
                        <p>
                            {props.description}
                        </p>
                    </div>

                    <div className = "place-item__actions">
                        <Button inverse onClick = {openMap}>
                            VIEW ON MAP
                        </Button>
                        {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
                        {auth.isLoggedIn && <Button danger onClick ={showDeleteWarningHandler}>DELETE</Button>}
                        
                        
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem;