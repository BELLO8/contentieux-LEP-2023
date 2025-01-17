import 'leaflet/dist/leaflet.css'
import React from 'react'
import { GeoJSON, Map } from 'react-leaflet'
import usaStatesGeoJSON from '../../assets/usaGeo.json'

const LiveVote = () => {

    const onEachFeature = (feature, layer) => {
        const stateName = feature.properties.shapeName

        layer.setStyle({
            fillColor: "red",
            weight: 1,
            color: 'white',
            fillOpacity: 1
        })

        layer.bindPopup(`<b>${stateName}</b>`)

        layer.on('mouseover', (e) => {
            e.target.setStyle({
                weight: 2,
                color: 'white'
            })
        })

        layer.on('mouseout', (e) => {
            e.target.setStyle({
                weight: 1,
                color: 'white'
            })
        })
    }

    return (
        <div>
            <Map center={[7.5468545, -5.547099500000002]} zoom={7} style={{ height: '80vh', width: '60%', zIndex: 0, borderRadius: "9px" }}>

                <GeoJSON
                    data={usaStatesGeoJSON} onEachFeature={onEachFeature} />
            </Map>
            <div>

            </div>
        </div>

    )
}

export default LiveVote
