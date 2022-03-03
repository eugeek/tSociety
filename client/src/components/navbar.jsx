import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './navbar.css';

function NavBar () {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand><Link className={"link-styles"} to="/">tSociety</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={"link-styles"} to="/">Найти меня!</Link>
                    </Nav>
                    <Nav>
                        <Link className={"link-styles"} to="/login">Войти</Link>
                        <Link className={"link-styles"} to="/signup">Зарегистрироваться</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;