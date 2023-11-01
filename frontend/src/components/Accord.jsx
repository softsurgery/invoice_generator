import Accordion from "react-bootstrap/Accordion";
import Icon from "@mdi/react";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { mdiBackburger, mdiImageArea } from "@mdi/js";
import { mdiFormatFloatLeft } from "@mdi/js";
import { mdiCash } from "@mdi/js";
import { mdiCog } from '@mdi/js';
import invoiceStore from "../data/InvoiceStore";
import settings from "../data/settingsStore";
import { currencies } from "../data/currencyList";
import { observer } from "mobx-react";
import { Typeahead } from 'react-bootstrap-typeahead';

function filterBy(option, state) {
  if (state.selected.length) {
    return true;
  }
  return option.toLowerCase().indexOf(state.text.toLowerCase()) > -1
  return true
}

const toggleTextStyle = (color) => {
  return { color: color, fontWeight: "bold", fontSize: "18px" }
}

const Accord = observer(() => {
  return (
    <Accordion >
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Icon path={mdiFormatFloatLeft} size={2} />
          <h5 className="m-2">Filling & Form</h5>
        </Accordion.Header>
        <Accordion.Body>
          <ul>
            <li className="mt-2">
              <strong>Billing & Shipping:</strong> Enter the recipient's billing
              and shipping information.
            </li>
            <li className="mt-2">
              <strong>Invoice Number:</strong> Create a unique invoice number.
            </li>
            <li className="mt-2">
              <strong>Date & Terms:</strong> Set the invoice date and payment
              terms.
            </li>
            <li className="mt-2">
              <strong>Due Date & PO Number</strong>: Specify the due date and
              purchase order number.
            </li>
            <li className="mt-2">
              <strong>Item List:</strong> Add your products or services in the
              table & Use "Add Item" and "Delete" buttons for items.
            </li>
            <li className="mt-2">
              <strong>Discount, Tax, Shipping:</strong> If applicable, enter
              discounts, taxes, and shipping costs.
            </li>
            <li className="mt-2">
              <strong>Amount Paid & Balance Due:</strong> Record payments
              received and view the remaining balance.
            </li>
            <li className="mt-2">
              <strong>Download:</strong> Generate and download the invoice when
              ready.
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <Icon path={mdiImageArea} size={2} />
          <h5 className="m-2">Company Logo</h5>
        </Accordion.Header>
        <Accordion.Body>
          <ul>
            <li className="mt-2">
              To add your company logo, replace the existing image with your
              own.
            </li>
            <li className="mt-2">
              Make sure your logo is in the right format and dimensions.
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <Icon path={mdiCog} size={2} />
          <h5 className="m-2">Invoice Settings</h5>
        </Accordion.Header>
        <Accordion.Body>
          <strong className="mt-2">
            Change Currency:
          </strong>
          <br />
          <Typeahead
            className="mt-2"
            filterBy={filterBy}
            id="toggle_currency"
            options={currencies.map(curr => curr.code + " " + curr.symbol)}
            placeholder="Currency..."
            onChange={(text, e) => { invoiceStore.setCurrency(text) }}
            inputProps={{ value: invoiceStore.getCurrency() }}
            defaultInputValue={invoiceStore.getCurrency()}
          >

          </Typeahead>

          <Row className="mt-4">
            <Col>
              <strong className="mt-2">
                Save Invoice:
              </strong>
              <Form.Check
                style={toggleTextStyle("#1b8856")}
                id="gswitch"
                className="mt-2"
                type="switch"
                label="Auto-Save"
                checked={settings.getAutoSave()}
                onChange={() => settings.toggleAutoSave()} />
            </Col>
            <Col>
              <strong className="mt-2">
                Check for Errors:
              </strong>
              <Form.Check
                style={toggleTextStyle("#dc3545")}
                id="rswitch"
                className="mt-2"
                type="switch"
                label="Check"
                checked={settings.getCheck()}
                onChange={() => settings.toggleCheck()} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <strong className="mt-2">
                Developper Mode:
              </strong>
              <Form.Check
                style={toggleTextStyle("#1672fd")}
                className="mt-2"
                id="bswitch"
                type="switch"
                label="Activate"
                checked={settings.getDev()}
                onChange={() => settings.toggleDev()} />
            </Col>

          </Row>
          <br />


        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
})

export default Accord;
