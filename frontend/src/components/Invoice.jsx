import { useRef } from 'react'
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react";
import invoiceInstanceStore from '../data/InvoiceInstanceStore';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { mdiDownload } from '@mdi/js';
import { mdiPrinter } from '@mdi/js';
import { mdiKey } from '@mdi/js';

const Invoice = observer(() => {
    let index = 0

    const imageInputRef = useRef(null);

    const handleFileChange = (e) => {
        console.log("from comp ", e.target.files[0])
        invoiceInstanceStore.setLogo(e.target.files[0])
    };

    return (
        <div>
            <div className="invoice">
                <Row>
                    <Col sx={7}>
                        <Figure>
                            <Figure.Image
                                className='logo'
                                alt="logo"
                                src={typeof invoiceInstanceStore.logo === 'string' ? invoiceInstanceStore.logo
                                    : invoiceInstanceStore.logo ? URL.createObjectURL(invoiceInstanceStore.logo)
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
                                onChange={(e) => handleFileChange(e)}
                                style={{ display: "none" }}
                                ref={imageInputRef}
                            />
                        </Figure>
                        <br />
                        <strong className='mt-2'>Who is this invoice from? (required)</strong>
                        <br />
                        <Form.Control
                            name="company"
                            type="text"
                            placeholder="Who is this invoice from?"
                            className="mt-2"
                            value={invoiceInstanceStore.getCompany()}
                            onChange={(e) => { invoiceInstanceStore.setCompany(e.target.value) }} />
                        <Row className="mt-2" >
                            <Col xs={6}>
                                <strong>Bill To</strong>
                                <br />
                                <Form.Control
                                    name="bills"
                                    type="text"
                                    placeholder="Bill To"
                                    className="mt-2"
                                    value={invoiceInstanceStore.getBills()}
                                    onChange={(e) => { invoiceInstanceStore.setBills(e.target.value) }} />
                            </Col>
                            <Col xs={6}>
                                <strong>Ship To</strong>
                                <br />
                                <Form.Control
                                    name="ships"
                                    type="text"
                                    placeholder="Ship To"
                                    className="mt-2"
                                    value={invoiceInstanceStore.getShips()}
                                    onChange={(e) => { invoiceInstanceStore.setShips(e.target.value) }} />
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
                                type="text"
                                disabled
                                value={invoiceInstanceStore.getId()}
                                onChange={(e) => { invoiceInstanceStore.setId(e.target.value) }} />
                            <InputGroup.Text style={{backgroundColor:"rgba(0,0,0,0)"}}>
                                <Button
                                    variant="primary"
                                    onClick={() => {invoiceInstanceStore.generateRandomId()}}
                                ><Icon path={mdiKey} size={1} /> Generate ID</Button>
                            </InputGroup.Text>
                        </InputGroup>

                        <Stack className="justify-content-end" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Date :</strong>
                            <Form.Control
                                className="w-50"
                                name="date"
                                type="date"
                                placeholder="Date"
                                value={invoiceInstanceStore.getDate()}
                                onChange={(e) => { invoiceInstanceStore.setDate(e.target.value) }} />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Payment Terms :</strong>
                            <Form.Control
                                className="w-50"
                                name="payement_terms"
                                type="text"
                                placeholder="Payment Terms"
                                value={invoiceInstanceStore.getPaymentTerms()}
                                onChange={(e) => { invoiceInstanceStore.setPaymentTerms(e.target.value) }} />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Due Date :</strong>
                            <Form.Control
                                className="w-50"
                                name="due_date"
                                type="date"
                                placeholder="Who is this invoice from?"
                                value={invoiceInstanceStore.getDueDate()}
                                onChange={(e) => { invoiceInstanceStore.setDueDate(e.target.value) }} />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>PO Number :</strong>
                            <Form.Control
                                className="w-50"
                                name="po_number"
                                type="text"
                                placeholder="PO Number"
                                value={invoiceInstanceStore.getPONumber()}
                                onChange={(e) => { invoiceInstanceStore.setPONumber(e.target.value) }} />
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
                            invoiceInstanceStore.getItems().map((item) => {
                                const isFirstItem = item.id === invoiceInstanceStore.getItems()[0].id;
                                index++;
                                return (
                                    <tr key={`item${item.id}`}>
                                        <td style={{ width: "65%" }}>
                                            <Form.Control
                                                type="text"
                                                placeholder={"Description of Service or Product " + index}
                                                value={item.description}
                                                onChange={(e) => {
                                                    invoiceInstanceStore.updateItem(item.id, "description", e.target.value);
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
                                                    invoiceInstanceStore.updateItem(item.id, "quantity", e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <Form.Control
                                                type="number"
                                                min={0}
                                                placeholder={invoiceInstanceStore.getCurrency()}
                                                value={item.rate}
                                                onChange={(e) => {
                                                    invoiceInstanceStore.updateItem(item.id, "rate", e.target.value);
                                                }}
                                            />
                                        </td>
                                        <td style={{ width: "15%" }}>
                                            <h6 className="mt-2 mr-3">
                                                {(item.rate * item.quantity).toFixed(2)} {invoiceInstanceStore.getCurrency()}
                                            </h6>
                                        </td>
                                        {isFirstItem ? (
                                            <td>
                                                <Button
                                                    style={{ width: "73px" }}
                                                    variant="danger"
                                                    onClick={() =>
                                                        invoiceInstanceStore.clearFirstItem()
                                                    }
                                                >
                                                    Clear
                                                </Button>
                                            </td>
                                        ) : (
                                            <td style={{ width: "5%" }}>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => invoiceInstanceStore.deleteItem(item.id)}
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
                            onClick={() => invoiceInstanceStore.addItem()}
                        > <Icon path={mdiPlus} size={1} /> Add Item </Button>

                        <p className="conditions mt-5">
                            For your kind settlement
                            And with our thanks.
                            <br /><br />
                            Payment terms: payment upon receipt of invoice.
                            No discount granted for early payment.
                            Payment by bank transfer or credit card.
                            <br /><br />
                            In the event of late payment, fixed compensation for recovery costs: 40{invoiceInstanceStore.getCurrency()}
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
                                    value={invoiceInstanceStore.getDiscount()}
                                    min={0}
                                    max={100}
                                    onChange={(e) => { invoiceInstanceStore.setDiscount(e.target.value) }} />
                                <InputGroup.Text >%</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Tax :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    type="number"
                                    min={0}
                                    value={invoiceInstanceStore.getTax()}
                                    onChange={(e) => { invoiceInstanceStore.setTax(e.target.value) }} />
                                <InputGroup.Text >%</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Shipping :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    type="number"
                                    min={0}
                                    value={invoiceInstanceStore.getShipping()}
                                    onChange={(e) => { invoiceInstanceStore.setShipping(e.target.value) }} />
                                <InputGroup.Text >{invoiceInstanceStore.getCurrency()}</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Total HT :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    disabled
                                    type="number"
                                    value={invoiceInstanceStore.sum().toFixed(2)} />
                                <InputGroup.Text >{invoiceInstanceStore.getCurrency()}</InputGroup.Text>
                            </InputGroup>
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Total TTC :</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    disabled
                                    type="number"
                                    value={invoiceInstanceStore.getTTC().toFixed(2)}
                                />
                                <InputGroup.Text >{invoiceInstanceStore.getCurrency()}</InputGroup.Text>
                            </InputGroup>
                        </Stack>
                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Amount Paid</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    type="number"
                                    min={0}
                                    value={invoiceInstanceStore.getAmountPaid()}
                                    onChange={(e) => { invoiceInstanceStore.setAmountPaid(e.target.value) }}
                                />
                                <InputGroup.Text >{invoiceInstanceStore.getCurrency()}</InputGroup.Text>
                            </InputGroup>
                        </Stack>
                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <strong className='right-type mt-2 mr-3'>Balance Due</strong>
                            <InputGroup className="w-50">
                                <Form.Control
                                    disabled
                                    type="number"
                                    value={invoiceInstanceStore.getBalanceDue().toFixed(2)}
                                />
                                <InputGroup.Text >{invoiceInstanceStore.getCurrency()}</InputGroup.Text>
                            </InputGroup>
                        </Stack>
                    </Col>
                </Row>


                <br />
                <Button
                    variant="success"
                    onClick={() => {
                        if (!invoiceInstanceStore.getLogo()) alert("image failed")
                        else invoiceInstanceStore.download()
                    }
                    }
                ><Icon path={mdiDownload} size={1} /> Download Invoice</Button>{' '}
                <Button
                    variant="primary"
                    onClick={() => {
                        if (!invoiceInstanceStore.getLogo()) alert("image failed")
                        else invoiceInstanceStore.print()
                    }
                    }
                ><Icon path={mdiPrinter} size={1} /> Print Invoice</Button>{' '}
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