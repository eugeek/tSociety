import {useRef, useState} from "react";
import CreateForm from "./components/CreateForm";
import Map from "./components/Map";
import './App.css';

function NotRendererApp () {
    const functionRef = useRef();
    const [coords, setCoords] = useState();

    const handleCoordsChange = (obj) => {
        setCoords(obj);
    };

    return <div>
        <Map onClick={() => functionRef?.current(true)} getCoords={handleCoordsChange} />
        <CreateForm functionRef={functionRef} coords={coords} />
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
