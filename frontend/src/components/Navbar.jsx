import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/esm/Badge';
import { useNavigate } from "react-router-dom";

function NavbarComponent() {
    const navigate = useNavigate()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand
                    onClick={() => navigate("/")}
                    style={{ color: "#113f67" }}>
                    <img src="/assets/logo.png" alt="Invoice" width={70} />
                    Invoice Generator
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => navigate("/")}>New Invoice <Badge bg="success">Here</Badge></Nav.Link>
                        <Nav.Link onClick={() => navigate("/history")}>History</Nav.Link>
                        <Nav.Link onClick={() => navigate("/api")}>API</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
}

export default NavbarComponent