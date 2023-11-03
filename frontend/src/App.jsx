import NavbarComponent from './components/Navbar'
import Accord from './components/Accord';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Invoice from './components/Invoice';
import History from './components/History';
import Footer from './components/Footer';

function App() {

  return (<div>
    <BrowserRouter>
      <NavbarComponent />
      <Container fluid style={{ margin: "2em" }}>
        <Row >
          <Col xs={3}>
            <Accord />
          </Col>
          <Col xs={9}>
            <Routes>
              <Route path="/" element={<Invoice />} />
              <Route path="history" element={<History/>} />
              <Route path="api" element={<h1>API</h1>} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Col>
        </Row>
        <Footer />
      </Container>
    </BrowserRouter>
  </div>)
}
export default App
