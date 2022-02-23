import {MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useEffect, useState} from "react";
import L from 'leaflet';
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import toilet from './images/toilet.png';
import arrow from './images/arrow.png';

const toiletIcon = L.icon({
    iconUrl: toilet,
    iconRetinaUrl: toilet,
    iconAnchor: [18, 30],
    popupAnchor:[2, -35],
    iconSize: [40,40]
});

const youIcon = L.icon({
    iconUrl: arrow,
    iconRetinaUrl: arrow,
    iconAnchor: [18, 30],
    popupAnchor:[2, -35],
    iconSize: [40,40]
});

function FindMe() {
    const [pos, setPos] = useState(null);
    const map = useMap();
    map.locate().on('locationfound', (e) => {
        setPos(e.latlng);
        map.flyTo(e.latlng, 14);
    });
    return pos === null ? null : (
        <Marker position={pos} icon={youIcon}>
            <Tooltip permanent>
                <span>Ты здесь!</span>
            </Tooltip>
        </Marker>
    );
}

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

const Map = ({ onClickMap, getCoords }) => {

    const [cursor, setCursor] = useState(null);

    function MyClickOnMap() {
        useMapEvents({
            click: (e) => {
                const {lat,lng} = e.latlng;
                getCoords([lat, lng]);
                setCursor(e.latlng);
                onClickMap();
            }
        })
        return null;
    }

    return (
        <div>
            <MapContainer
                center={[59.939, 30.319]}
                scrollWheelZoom={true}
                style={{height: 500, width: "100%"}}
                doubleClickZoom={false}
                zoom={13}
                maxZoom={18}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyClickOnMap />
                { cursor &&
                    <Popup position={cursor}>
                        Добавим здесь?
                    </Popup>
                }
                <FindMe />
                <MarkerClusterGroup showCoverageOnHover={false}>
                    <LocationMarkers />
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};

export default Map;