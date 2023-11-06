import Accordion from "react-bootstrap/Accordion";
import Icon from "@mdi/react";
import Form from 'react-bootstrap/Form';
import { mdiImageArea } from "@mdi/js";
import { mdiFormatFloatLeft } from "@mdi/js";
import { mdiCog } from '@mdi/js';
import invoiceInstanceStore from "../data/InvoiceInstanceStore";
import settings from "../data/settingsStore";
import { currencies } from "../json/currencies";
import { observer } from "mobx-react";
import { Typeahead } from 'react-bootstrap-typeahead';

function filterBy(option, state) {
  return option.toLowerCase().indexOf(state.text.toLowerCase()) > -1
}

const toggleTextStyle = (color, active) => {
  return { color: active ? color : "grey", fontWeight: "bold", fontSize: "18px" }
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
            className="mt-2 mb-3"
            filterBy={filterBy}
            id="toggle_currency"
            options={currencies.map(curr => curr.code + " " + curr.symbol )}
            placeholder="Currency..."
            onChange={(text, e) => { invoiceInstanceStore.setCurrency(text) }}
            inputProps={{ value: invoiceInstanceStore.getCurrency() }}
            defaultInputValue={invoiceInstanceStore.getCurrency()}
          >
          </Typeahead>

          <Form.Check
            style={toggleTextStyle("#1672fd", settings.getDev())}
            className="mt-2"
            id="bswitch"
            type="switch"
            label="Developer Mode"
            checked={settings.getDev()}
            onChange={() => settings.toggleDev()} />
          {settings.getDev() ?
            <div>
              <Form.Check
                style={toggleTextStyle("#1b8856", settings.getAutoSave())}
                id="gswitch"
                className="mt-2"
                type="switch"
                label="Auto-Save"
                checked={settings.getAutoSave()}
                onChange={() => settings.toggleAutoSave()} />

              <Form.Check
                style={toggleTextStyle("#dc3545", settings.getCheck())}
                id="rswitch"
                className="mt-2"
                type="switch"
                label="Form Control"
                checked={settings.getCheck()}
                onChange={() => settings.toggleCheck()} />
                <br />
            </div> : ""}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
})

export default Accord;
