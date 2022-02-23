import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useEffect, useState} from "react";
import L from 'leaflet';
import logo from './images/toilet.png';
import axios from "axios";

const toiletIcon = L.icon({
    iconUrl: logo,
    iconRetinaUrl: logo,
    iconAnchor: [0, 0],
    popupAnchor:[18, -15],
    iconSize: [45,45]
});

const Map = ({ onClickMap, getCoords }) => {

    function LocationMarkers() {
        const [markers, setMarkers] = useState([]);

        function markerClick(e) {
            //alert(e.target.options.toiletId)
        }

        async function getMarkers () {
            await axios.get('http://localhost:3080/api/gettoilets')
                .then(res => {
                    setMarkers(res.data);
                });
        }
        useEffect(() => getMarkers(), []);

        return (
            <React.Fragment>
                {markers.map(marker =>
                    <Marker
                        key={marker.id}
                        position={[marker.coords.lat, marker.coords.lng]}
                        icon={toiletIcon}
                        eventHandlers={{
                            click: (e) => {
                                markerClick(e);
                            },
                        }}
                    >
                        <Popup>
                            <p>Туалет №{marker.id}</p>
                            <hr />
                            <p>{marker.description}</p>
                            <hr />
                            <p>Количество кабинок: {marker.props.cabs}</p>
                            <p>Туалетная бумага: {marker.props.paper === true ? 'Есть' : 'Нет'}</p>
                        </Popup>
                    </Marker>)
                }
            </React.Fragment>
        );
    }

    function MyClickOnMap() {
        useMapEvents({
            click: (e) => {
                const {lat,lng} = e.latlng;
                getCoords([lat, lng]);
                onClickMap();
            }
        })
        return null;
    }

    return (
        <div>
            <MapContainer
                center={[59.939, 30.319]}
                zoom={13}
                scrollWheelZoom={true}
                style={{height: 500, width: "100%"}}
                doubleClickZoom={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyClickOnMap />
                <LocationMarkers />
            </MapContainer>
        </div>
    );
};

export default Map;