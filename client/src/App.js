import {useRef, useState} from "react";
import CreateForm from "./components/CreateForm";
import InfoToilet from "./components/InfoToilet";
import Map from "./components/Map";
import './App.css';

function NotRendererApp () {
    const [addToilet, setAddToilet] = useState(false);
    const [coords, setCoords] = useState();

    const handleCoordsChange = (obj) => {
        setCoords(obj);
    };

    return <div>
        <Map
            showCreateForm={(e) => setAddToilet(e)}
            getCoords={handleCoordsChange}
        />
        <CreateForm showCreateForm={addToilet} coords={coords} />
        <InfoToilet />
    </div>;
}

function App() {
    return (
        <>
            <NotRendererApp />
        </>
    );
}

export default App;
