import { useState } from 'react'
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react";
import invoiceStore from '../data/InvoiceStore';

const Invoice = observer(() => {

    return (
        <div style={{ width: "100%" }}>
            <div className="invoice">
                <Row>
                    <Col sx={7}>
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src="/assets/picture.jpg"
                            />
                            <Figure.Caption style={{ textAlign: "center" }}>
                                Add Your Logo
                            </Figure.Caption>
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
                        <p className="justify-content-end"><strong>Invoice Reference</strong></p>
                        <InputGroup className="mb-3 justify-content-end">
                            <InputGroup.Text>#</InputGroup.Text>
                            <Form.Control
                                placeholder="Invoice ID"
                                name="id"
                                type="number"
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
                                placeholder="Who is this invoice from?"
                                alue={invoiceStore.getPONumber()}
                                onChange={(e) => { invoiceStore.setPONumber(e.target.value) }} />
                        </Stack>

                    </Col>
                </Row>

                <br />
                <br />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th ></th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceStore.getItems().map(
                            item => {
                                return (
                                    
                                    <tr id={`item${item.id}`}>
                                      <Button
                    variant="success"
                    onClick={() => invoiceStore.addItem()}
                >Add Item</Button>{' '}  
                                        <td style={{ width: "700px" }}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Description of Service or Product"
                                                value={item.description}
                                                onChange={(e) => { invoiceStore.updateItem(item.id, "description", e.target.value) }} />
                                        </td>

                                        <td >
                                            <Form.Control
                                                type="number"
                                                placeholder='1'
                                                value={item.quantity}
                                                onChange={(e) => { invoiceStore.updateItem(item.id, "quantity", e.target.value) }} />
                                        </td>

                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder='$'
                                                value={item.rate}
                                                onChange={(e) => { invoiceStore.updateItem(item.id, "rate", e.target.value) }} />
                                        </td>

                                        <td style={{ width: "100px" }}>
                                            <h6 className='mt-2 mr-3'>{(item.rate * item.quantity).toFixed(2)} $</h6>
                                        </td>
                                    </tr>)
                            }
                        )}
                    </tbody>
                </table>
                <Button
                    variant="success"
                    onClick={() => invoiceStore.addItem()}
                >Add Item</Button>{' '}
                <Row>
                    <div className="col-8">
                    </div>
                    <div className="col-4">
                        <table className="table table-sm text-right">
                            <tr>
                                <td><strong>Total HT</strong></td>
                                <td className="text-right" th: text="${totalHT}">0,00€</td>
                            </tr>
                            <tr>
                                <td>TVA 20%</td>
                                <td className="text-right" th: text="${totalTVA}">0,00€</td>
                            </tr>
                            <tr>
                                <td><strong>Total TTC</strong></td>
                                <td className="text-right" th: text="${totalTTC}">0,00€</td>
                            </tr>
                        </table>
                    </div>
                </Row>

                <p className="conditions">
                    En votre aimable règlement
                    <br />
                    Et avec nos remerciements.
                    <br /><br />
                    Conditions de paiement : paiement à réception de facture.
                    <br />
                    Aucun escompte consenti pour règlement anticipé.
                    <br />
                    Règlement par virement bancaire ou carte bancaire.
                    <br /><br />
                    En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40 euros (art. L.4413
                    et
                    L.4416 code du commerce).
                </p>

                <br />
                <br />
                <br />
                <br />

                <p className="bottom-page text-right">
                    MYSAM SAS - N° SIRET 81754802700017 RCS ALBI<br />
                    8, avenue de la Martelle - 81150 TERSSAC 06 32 97 00 22 - www.mysam.fr<br />
                    Code APE 6312Z - N° TVA Intracom. FR 63 817548027<br />
                    IBAN FR76 1470 7034 0031 4211 7882 825 - SWIFT CCBPFRPPMTZ
                </p>
            </div>
        </div >
    )
})
export default Invoice
