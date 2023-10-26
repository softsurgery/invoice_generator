import Accordion from "react-bootstrap/Accordion";
import Icon from "@mdi/react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { mdiImageArea } from "@mdi/js";
import { mdiFormatFloatLeft } from "@mdi/js";
import { mdiCash } from "@mdi/js";
import invoiceStore from "../data/InvoiceStore";
import { currencies } from "../data/currencyList";

function Accord() {
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
          <Icon path={mdiCash} size={2} />
          <h5 className="m-2">Currency</h5>
        </Accordion.Header>
        <Accordion.Body>
          <strong className="mt-2">
            Change Currency:
          </strong>
          <br />
          <InputGroup className="mt-2">
            <Form.Select
              onChange={(e) => { invoiceStore.setCurrency(e.target.value) }}>
                {currencies.map(curr => {
                  return (<option 
                            key ={curr.name} 
                            value={curr.code + " " + curr.symbol}>
                              {curr.code} {curr.symbol}
                          </option>)
                })}
              
            </Form.Select>
          </InputGroup>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Accord;
