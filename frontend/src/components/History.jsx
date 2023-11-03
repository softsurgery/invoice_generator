import Icon from "@mdi/react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { mdiBackburger, mdiImageArea } from "@mdi/js";
import { mdiFormatFloatLeft } from "@mdi/js";
import { mdiCash } from "@mdi/js";
import { mdiCog } from "@mdi/js";
import invoiceStore from "../data/InvoiceInstanceStore";
import settings from "../data/settingsStore";
import { currencies } from "../data/currencyList";
import { observer } from "mobx-react";
import { Typeahead } from "react-bootstrap-typeahead";
import InvoiceCard from "./InvoiceCard";
import Stack from 'react-bootstrap/Stack';

const History = observer(() => {
    return (
        <Container fluid>
            <h1>History</h1>
            <hr />
            <div className="m-4">
                <InvoiceCard
                    id="1698857690308-9008"
                    bills_to="Hammadi"
                />
            </div>
        </Container>
    );
});

export default History;
