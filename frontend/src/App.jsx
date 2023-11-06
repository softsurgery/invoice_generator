import NavbarComponent from './components/Navbar';
import Accord from './components/Accord';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import settings from './data/settingsStore';
import Container from 'react-bootstrap/Container';
import Invoice from './components/Invoice';
import History from './components/History';
import Footer from './components/Footer';
import E404 from './components/E404';
import { observer } from 'mobx-react';

const App = observer(() => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Container fluid style={{padding : "2em"}}>
        <Row>
        {!settings.getFlip() ? <Col xs={3}>
            <Accord />
          </Col> : ""}
          <Col xs={9}>
            <Routes>
              <Route path="/" element={<Invoice />} />
              <Route path="history" element={<History />} />
              <Route path="*" element={<E404/>} />
            </Routes>
          </Col>
         {settings.getFlip() ? <Col xs={3}>
            <Accord />
          </Col> : ""}
        </Row>
        <Footer />
      </Container>
    </BrowserRouter>
  );
})

export default App;

