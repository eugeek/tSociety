import './Map.css';
import {MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useEffect, useState} from "react";
import L from 'leaflet';
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import toilet from './images/toilet.png';
import arrow from './images/arrow.png';
import {Button, Card, Form, ListGroup, ListGroupItem} from "react-bootstrap";

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

    const [description, setDescription] = useState('');
    const [cabs, setCabs] = useState(1);
    const [paperChecked, setPaperChecked] = useState(false)


    const checkPaper = () => {
        setPaperChecked(!paperChecked);
    };

    async function handleSubmit (e) {
        e.preventDefault();

        const data = {
            latlng: {
                lat: cursor.lat,
                lng: cursor.lng
            },
            description: description,
            props: {
                cabs: cabs,
                paper: paperChecked
            }
        };

        await axios
            .post('http://localhost:3080/api/createtoilet', data)
            .then( res => console.log(res));

    }

    return (
        <div style={{height: window.innerHeight - 60, width: '100%', padding: 0, margin: 0}}>
            <MapContainer
                center={[59.939, 30.319]}
                scrollWheelZoom={true}
                doubleClickZoom={false}
                style={{height: '100%'}}
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
                        <div className="container sigcont center-block">
                            <Form onSubmit={handleSubmit}>
                                <h1>Создание туалета</h1>
                                <Form.Text className="text-muted">
                                    Посмотрите на карту и убедитесь в правильности установки метки
                                </Form.Text>
                                <Form.Group controlId="form.Desc">
                                    <Form.Label>Описание:</Form.Label>
                                    <Form.Control type="text" placeholder="Опишите здесь данное место" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="form.Cabs">
                                    <Form.Label>Количество кабинок:</Form.Label>
                                    <Form.Control type="text" placeholder="Укажите количество кабинок здесь" value={cabs} onChange={(e) => setCabs(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="- есть ли туалетная бумага" checked={paperChecked} onChange={checkPaper} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Добавить
                                </Button>
                            </Form>
                        </div>
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