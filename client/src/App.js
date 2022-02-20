import {useRef} from "react";
import CreateForm from "./components/CreateForm";
import Map from "./components/Map";
import './App.css';

function NotRendererApp () {
    const functionRef = useRef();
    return <div>
        <Map onClick={() => functionRef?.current(true)} />
        <CreateForm functionRef={functionRef} />
    </div>;
}

function App() {
    async function onClickButton () {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }
        const res = await fetch('http://localhost:3080/data', requestOptions);
        const data = await res.json();
        alert(JSON.stringify(data));
    }
    return (
        <>
            <NotRendererApp />
            <button onClick={onClickButton}>CLICK CLACK</button>
        </>
    );
}

export default App;
