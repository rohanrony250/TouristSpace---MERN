import React from "react"
import "./Map.scss"
import GoogleMapReact from "google-map-react"

const Map = (props) =>
{
    return( 
        <div className = {`map ${props.className}`} style = {props.style}>
            <GoogleMapReact 
                bootstrapURLKeys = {{key: "AIzaSyDbRzSwVFauvPia29Yy08biPmxzUDiliM8"}}
                defaultCenter = {props.coordinates}
                defaultZoom = {16}
            />
        </div>
    )
}

export default Map