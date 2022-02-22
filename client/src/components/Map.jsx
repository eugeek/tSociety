import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ onClick, getCoords }) => {

    function MyClickOnMap() {
        useMapEvents({
            click: (e) => {
                const {lat,lng} = e.latlng;
                getCoords([lat, lng]);
                onClick();
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
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyClickOnMap />
            </MapContainer>
        </div>
    );
};

export default Map;