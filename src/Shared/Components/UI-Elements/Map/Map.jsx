import React from "react"
import "./Map.scss"
import GoogleMapReact from "google-map-react"

const Map = (props) =>
{
    return(
        <div className = {`map ${props.className}`} style = {props.style}>
            <GoogleMapReact>
                
            </GoogleMapReact>
        </div>
    )
}

export default Map