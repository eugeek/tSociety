import {useRef, useState} from "react";
import CreateForm from "./components/CreateForm";
import InfoToilet from "./components/InfoToilet";
import Map from "./components/Map";
import './App.css';

function NotRendererApp () {
    const createRef = useRef();
    const [coords, setCoords] = useState();

    const handleCoordsChange = (obj) => {
        setCoords(obj);
    };

    return <div>
        <Map
            onClickMap={() => createRef?.current(true)}
            getCoords={handleCoordsChange}
        />
        <CreateForm createRef={createRef} coords={coords} />
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
