import 'leaflet/dist/leaflet.css'
import React from 'react'
import { GeoJSON, Map } from 'react-leaflet'
import usaStatesGeoJSON from '../../assets/usaGeo.json'

const LiveVote = () => {

    const regionColors = [
        "#1f77b4", // Bleu
        "#ff7f0e", // Orange
        "#2ca02c", // Vert
        "#d62728", // Rouge
        "#9467bd", // Violet
        "#8c564b", // Marron
        "#e377c2", // Rose
        "#7f7f7f", // Gris
        "#bcbd22", // Jaune
        "#17becf", // Cyan
        "#aec7e8", // Bleu clair
        "#ffbb78", // Orange clair
        "#98df8a", // Vert clair
        "#ff9896"  // Rouge clair
    ]


    const onEachFeature = (feature, layer) => {
        const getRegionColor = (regionName) => {
            const regionNames = usaStatesGeoJSON.features.map(region => region.properties.shapeName)
            const index = regionNames.indexOf(regionName)
            return index !== -1 ? regionColors[index] : "#ccc"
        }

        layer.setStyle({
            fillColor: getRegionColor(feature.properties.shapeName),
            weight: 1,
            color: 'white',
            fillOpacity: 1
        })

        layer.bindTooltip(feature.properties.shapeName, { permanent: true, direction: "center" })


        layer.bindPopup(`<div>Nombre de : 12</div>`)

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
