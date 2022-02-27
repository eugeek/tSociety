import {MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useEffect, useState} from "react";
import L from 'leaflet';
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import toilet from './images/toilet.png';
import arrow from './images/arrow.png';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

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
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title className="text-center fs-4" >Туалет №{marker.id}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted fs-6">{marker.description}</Card.Subtitle>
                                <ListGroup className="list-group-flush text-center fs-6">
                                    <ListGroupItem>Количество кабинок: {marker.props.cabs}</ListGroupItem>
                                    <ListGroupItem>Туалетная бумага: {marker.props.paper === true ? 'Есть' : 'Нет'}</ListGroupItem>
                                </ListGroup>
                                <Card.Link href="/" className="fs-6">Подробнее</Card.Link>
                            </Card.Body>
                        </Card>
                    </Popup>
                </Marker>)
            }
        </React.Fragment>
    );
}

const Map = ({ showCreateForm, getCoords }) => {

    const [cursor, setCursor] = useState(null);

    function MyClickOnMap() {
        useMapEvents({
            click: (e) => {
                const {lat,lng} = e.latlng;
                getCoords([lat, lng]);
                setCursor(e.latlng);
                showCreateForm(true);
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
                    <Popup
                        position={cursor}
                        onClose={() => {
                            setCursor(null);
                            showCreateForm(false);
                        }
                        }
                    >
                        <span>Добавим здесь?</span>
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