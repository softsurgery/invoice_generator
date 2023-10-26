import { useRef } from 'react'

import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react";
import invoiceStore from '../data/InvoiceStore';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { mdiDownload } from '@mdi/js';


const Invoice = observer(() => {
    let index = 0

    const imageInputRef = useRef(null);

    const handleFileChange = (e) => {
        invoiceStore.setLogo(e.target.files[0])
    };

    return (
        <div style={{ width: "100%" }}>
            <div className="invoice">
                <Row>
                    <Col sx={7}>
                        <Figure>
                            <Figure.Image
                                className='logo'
                                alt="logo"
                                src={typeof invoiceStore.logo === 'string' ? invoiceStore.logo
                                : invoiceStore.logo ? URL.createObjectURL(invoiceStore.logo)
                                    : "/assets/picture.png"}
                                onClick={(e) => { imageInputRef.current.click() }}
                            />
                            <Figure.Caption style={{ textAlign: "center" }}>
                                Add Your Logo
                            </Figure.Caption>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                ref={imageInputRef}
                            />
                        </Figure>
                        <br />
                        <strong>Who is this invoice from? (required)</strong>
                        <br />
                        <Form.Control name="company" type="text" placeholder="Who is this invoice from?" className="mt-2" />
                        <Row className="mt-2" >
                            <Col xs={6}>
                                <strong>Bill To</strong>
                                <br />
                                <Form.Control
                                    name="bills"
                                    type="text"
                                    placeholder="Bill To"
                                    className="mt-2"
                                    value={invoiceStore.getBills()}
                                    onChange={(e) => { invoiceStore.setBills(e.target.value) }} />
                            </Col>
                            <Col xs={6}>
                                <strong>Ship To</strong>
                                <br />
                                <Form.Control
                                    name="ships"
                                    type="text"
                                    placeholder="Ship To"
                                    className="mt-2"
                                    value={invoiceStore.getShips()}
                                    onChange={(e) => { invoiceStore.setShips(e.target.value) }} />
                            </Col>
                        </Row>
                    </Col>
                    <Col sx={5}>
                        <h1 className="justify-content-end">INVOICE</h1>
                        <p className="justify-content-end"><strong>Invoice Reference :</strong></p>
                        <InputGroup className="mb-3 justify-content-end">
                            <InputGroup.Text>#</InputGroup.Text>
                            <Form.Control
                                placeholder="Invoice ID"
                                name="id"
                                type="number"
                                min={0}
                                value={invoiceStore.getId()}
                                onChange={(e) => { invoiceStore.setId(e.target.value) }} />
                        </InputGroup>

                        <Stack className="justify-content-end" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Date :</strong>
                            <Form.Control
                                className="w-50"
                                name="date"
                                type="date"
                                placeholder="Date"
                                value={invoiceStore.getDate()}
                                onChange={(e) => { invoiceStore.setDate(e.target.value) }} />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Payment Terms :</strong>
                            <Form.Control
                                className="w-50"
                                name="payement_terms"
                                type="text"
                                placeholder="Payment Terms"
                                value={invoiceStore.getPaymentTerms()}
                                onChange={(e) => { invoiceStore.setPaymentTerms(e.target.value) }} />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Due Date :</strong>
                            <Form.Control
                                className="w-50"
                                name="due_date"
                                type="date"
                                placeholder="Who is this invoice from?"
                                value={invoiceStore.getDueDate()}
                                onChange={(e) => { invoiceStore.setDueDate(e.target.value) }} />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>PO Number :</strong>
                            <Form.Control
                                className="w-50"
                                name="po_number"
                                type="text"
                                placeholder="PO Number"
                                value={invoiceStore.getPONumber()}
                                onChange={(e) => { invoiceStore.setPONumber(e.target.value) }} />
                        </Stack>

                    </Col>
                </Row>

                <br />
                <br />

                <table className="table table-striped">
                    <thead>
                        <tr>

                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoiceStore.getItems().map((item) => {
                                const isFirstItem = item.id === invoiceStore.getItems()[0].id;
                                index++;
                                return (
                                    <tr key={`item${item.id}`}>
                                        <td style={{ width: "65%" }}>
                                            <Form.Control
                                                type="text"
                                                placeholder={"Description of Service or Product " + index}
                                                value={item.description}
                                                onChange={(e) => {
                                                    invoiceStore.updateItem(item.id, "description", e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                placeholder="1"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    invoiceStore.updateItem(item.id, "quantity", e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                placeholder="$"
                                                value={item.rate}
                                                onChange={(e) => {
                                                    invoiceStore.updateItem(item.id, "rate", e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <h6 className="mt-2 mr-3">
                                                {(item.rate * item.quantity).toFixed(2)} $
                                            </h6>
                                        </td>
                                        {isFirstItem ? (
                                            <td>
                                                <Button
                                                    style={{ width: "73px" }}
                                                    variant="danger"
                                                    onClick={() =>
                                                        invoiceStore.clearFirstItem()
                                                    }
                                                >
                                                    Clear
                                                </Button>
                                            </td>
                                        ) : (
                                            <td style={{ width: "5%" }}>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => invoiceStore.deleteItem(item.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <Row>
                    <Col sx={7}>
                        <Button
                            variant="success"
                            onClick={() => invoiceStore.addItem()}
                        > <Icon path={mdiPlus} size={1} /> Add Item </Button>

                        <p className="conditions mt-5">
                            For your kind settlement
                            And with our thanks.
                            <br /><br />
                            Payment terms: payment upon receipt of invoice.
                            No discount granted for early payment.
                            Payment by bank transfer or credit card.
                            <br /><br />
                            In the event of late payment, fixed compensation for recovery costs: 40$
                            <br />
                            (art. L.4413 and L.4416 commercial code).
                        </p>
                    </Col>
                    <Col sx={5}>
                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Discount :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    type="number"
                                    value={invoiceStore.getDiscount()}
                                    min={0}
                                    max={100}
                                    onChange={(e) => { invoiceStore.setDiscount(e.target.value) }} />
                                <InputGroup.Text >%</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Tax :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    type="number"
                                    min={0}
                                    value={invoiceStore.getTax()}
                                    onChange={(e) => { invoiceStore.setTax(e.target.value) }} />
                                <InputGroup.Text >%</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Shipping :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    type="number"
                                    min={0}
                                    value={invoiceStore.getShipping()}
                                    onChange={(e) => { invoiceStore.setShipping(e.target.value) }} />
                                <InputGroup.Text >$</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Total HT :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    disabled
                                    type="number"
                                    value={invoiceStore.sum().toFixed(2)} />
                                <InputGroup.Text >$</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Total TTC :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    disabled
                                    type="number"
                                    value={invoiceStore.getTTC().toFixed(2)}
                                />
                                <InputGroup.Text >$</InputGroup.Text>
                            </InputGroup>
                        </Stack>
                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Amount Paid</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    type="number"
                                    value={invoiceStore.getAmountPaid()}
                                    onChange={(e) => { invoiceStore.setAmountPaid(e.target.value) }}
                                />
                                <InputGroup.Text >$</InputGroup.Text>
                            </InputGroup>
                        </Stack>
                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Balance Due</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    disabled
                                    type="number"
                                    value={invoiceStore.getBalanceDue().toFixed(2)}
                                />
                                <InputGroup.Text >$</InputGroup.Text>
                            </InputGroup>
                        </Stack>
                    </Col>
                </Row>


                <br />
                <Button
                    variant="success"
                ><Icon path={mdiDownload} size={1} /> Download Invoice</Button>{' '}
                {/* <textarea className="bottom-page text-right">
                    MYSAM SAS - N° SIRET 81754802700017 RCS ALBI<br />
                    8, avenue de la Martelle - 81150 TERSSAC 06 32 97 00 22 - www.mysam.fr<br />
                    Code APE 6312Z - N° TVA Intracom. FR 63 817548027<br />
                    IBAN FR76 1470 7034 0031 4211 7882 825 - SWIFT CCBPFRPPMTZ
                </textarea> */}
            </div>
        </div >
    )
})
export default Invoice