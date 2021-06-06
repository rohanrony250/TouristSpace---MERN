import React, {useState} from "react"
import Card from "../../Shared/Components/UI-Elements/Card/Card"
import "./PlaceItem.scss"
import Button from "../../Shared/Components/FormElements/Button"
import Modal from "../../Shared/Components/UI-Elements/Modal/Modal"
import Map from "../../Shared/Components/UI-Elements/Map/Map"
const PlaceItem = props =>
{ 
    const [showMap, setShowMap] = useState(false)
    const openMap = () => setShowMap(true)
    const closeMap = () => setShowMap(false)
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
                        <Button to={`/places/${props.id}`}>
                            EDIT
                        </Button>
                        <Button danger>
                            DELETE
                        </Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem;