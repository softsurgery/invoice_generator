import { useState } from 'react'
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { observer } from "mobx-react";
import invoiceStore from '../data/InvoiceStore.';

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
                        <br /><br />
                        <strong>Who is this invoice from? (required)</strong>
                        <br />
                        <Form.Control name="company" type="text" placeholder="Who is this invoice from?" className="w-75 mt-2" />

                    </Col>
                    <Col sx={5}>
                        <h1 className="justify-content-end">INVOICE</h1>
                        <p className="justify-content-end"><strong>Invoice Reference</strong></p>
                        <InputGroup className="mb-3 justify-content-end">
                            <InputGroup.Text>#</InputGroup.Text>
                            <Form.Control
                                placeholder="Invoice ID"
                            />
                        </InputGroup>

                        <Stack className="justify-content-end" direction="horizontal" gap={3}>
                            <h6 className='right-type mt-2 mr-3'>Date :</h6>
                            <Form.Control
                                className="w-50"
                                name="date"
                                type="date"
                                placeholder="Date"
                                value={invoiceStore.date} />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <h6 className='right-type mt-2 mr-3'>Payment Terms :</h6>
                            <Form.Control 
                                className="w-50" 
                                name="payement_terms" 
                                type="text" 
                                placeholder="Who is this invoice from?"
                                value={invoiceStore.payement_terms} />
                                
                               
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <h6 className='right-type mt-2 mr-3'>Due Date :</h6>
                            <Form.Control className="w-50" name="due_date" type="date" placeholder="Who is this invoice from?" />
                        </Stack>

                        <Stack className="justify-content-end mt-1" direction="horizontal" gap={3}>
                            <h6 className='right-type mt-2 mr-3'>PO Number :</h6>
                            <Form.Control className="w-50" name="po_number" type="text" placeholder="Who is this invoice from?" />
                        </Stack>

                    </Col>
                </Row>
                <Row>
                    <Col sx={7}>

                    </Col>
                    <Col sx={5}>
                        <br /><br /><br />
                        <p className="addressDriver">
                            <strong th: text="${driver.getCompanyName()}">Société VTC</strong><br />
                            Réf. Client <em th: text="${driver.getUserId()}">Référence client</em><br />
                            <span th: text="${driver.getFirstName()}">Prénom</span> <span
                                th: text="${driver.getLastName()}">NOM</span><br />
                            <span th: text="${driver.getAddress()}">adresse</span><br />
                            <span th: text="${driver.getZipCode()}">code postal</span> <span
                                th: text="${driver.getCity()}">VILLE</span>
                        </p>
                    </Col>
                </Row>
                <br />
                <br />
                <h6>Frais de services MYSAM du <span th: text="${start}">date</span> au <span th: text="${end}">date</span>
                </h6>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantité</th>
                            <th>Unité</th>
                            <th>PU TTC</th>
                            <th>TVA</th>
                            <th className="text-right">Total HT</th>
                            <th className="text-right">Total TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Frais de service MySam à 5% pour la période du <span th: text="${start}">date</span> au <span
                                th: text="${end}">date</span></td>
                            <td>13</td>
                            <td>Kilomètres</td>
                            <td className="text-right">1,20€</td>
                            <td>20%</td>
                            <td className="text-right" th: text="${summaryDriverClientsPayment.get('mysamHT')}">0,00€</td>
                            <td className="text-right" th: text="${summaryDriverClientsPayment.get('mysamTTC')}">0,00€</td>
                        </tr>
                        <tr>
                            <td>Frais de service MySam à 10% pour la période du <span th: text="${start}">date</span> au <span
                                th: text="${end}">date</span></td>
                            <td>15</td>
                            <td>Minutes</td>
                            <td className="text-right">0,25€</td>
                            <td>20%</td>
                            <td className="text-right" th: text="${summaryDriverPayment.get('mysamHT')}">0,00€</td>
                            <td className="text-right" th: text="${summaryDriverPayment.get('mysamTTC')}">0,00€</td>
                        </tr>
                        <tr>
                            <td>Pénalités d'annulation</td>
                            <td>5</td>
                            <td>Minutes</td>
                            <td className="text-right">-10€</td>
                            <td>20%</td>
                            <td className="text-right" th: text="${summaryPenalties.get('driverHT')}">0,00€</td>
                            <td className="text-right" th: text="${summaryPenalties.get('driverTTC')}">0,00€</td>
                        </tr>
                    </tbody>
                </table>
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
        </div>
    )
})
export default Invoice
