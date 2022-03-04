import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './navbar.css';
import {useState} from "react";

function NavBar () {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    );
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand><Link className={"link-styles"} to="/">tSociety</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="link-styles" to="/">Найти меня!</Link>
                    </Nav>
                    {
                        loginData !== null
                        ? <Nav>
                                <Link className="link-styles" to="/">{loginData.name}</Link>
                                <Button variant="secondary" onClick={handleLogout}>Выйти</Button>
                        </Nav> : <Nav>
                                <Link className="link-styles" to="/login">Войти</Link>
                                <Link className="link-styles" to="/signup">Зарегистрироваться</Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;