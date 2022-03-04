import { useState } from "react";
import CreateForm from "../components/CreateForm";
import Map from "../components/Map";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/navbar';

function Home() {
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
        </div>;
    }

    return (
        <>
            <NavBar />
            <NotRendererApp />
        </>
    );
}

export default Home;