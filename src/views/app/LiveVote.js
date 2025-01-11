import 'leaflet/dist/leaflet.css'
import React from 'react'
import { GeoJSON, Map, TileLayer } from 'react-leaflet'
import usaStatesGeoJSON from '../../assets/usaGeo.json'

const LiveVote = () => {
    // Styles dynamiques pour les états
    const getColor = (stateName) => {
        const republicanStates = ['TX', 'FL', 'GA'] // Remplacez par vos données
        const democratStates = ['CA', 'NY', 'WA']

        if (republicanStates.includes(stateName)) return '#b22234' // Rouge
        if (democratStates.includes(stateName)) return '#3c3b6e' // Bleu
        return '#d3d3d3' // Gris
    }

    const onEachFeature = (feature, layer) => {
        const stateName = feature.properties.name // Nom de l'état depuis GeoJSON
        layer.setStyle({
            fillColor: getColor(stateName),
            weight: 1,
            color: 'white',
            fillOpacity: 1
        })

        layer.bindPopup(`<b>${stateName}</b>`)

        layer.on('mouseover', (e) => {
            e.target.setStyle({
                weight: 2,
                color: 'black'
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
        <Map center={[37.8, -96]} zoom={4} style={{ height: '60vh', width: '60%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={usaStatesGeoJSON} onEachFeature={onEachFeature} />
        </Map>
    )
}

export default LiveVote
