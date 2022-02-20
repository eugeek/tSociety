import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ onClick }) => {
    return (
        <div onClick={onClick}>
            <MapContainer
                center={[59.939, 30.319]}
                zoom={13}
                scrollWheelZoom={true}
                style={{height: 500, width: "100%"}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};

export default Map;