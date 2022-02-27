import {useState} from "react";
import CreateForm from "./components/CreateForm";
import InfoToilet from "./components/InfoToilet";
import Map from "./components/Map";
import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">tSociety</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Где я?</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Войти</Nav.Link>
                            <Nav.Link eventKey={2} href="/signup">
                                Зарегистрироваться
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <NotRendererApp />
        </>
    );
}

export default App;
