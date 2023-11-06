import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Icon from '@mdi/react';
import { mdiDownload } from '@mdi/js';
import { mdiPrinter } from '@mdi/js';

function InvoiceCard(props) {
    return (
        <Card className="mt-4" style={{ width: '90%' }}>
            <Card.Header>{props.created_at}</Card.Header>
            <Card.Body>
                <Card.Title><span>Invoice : {props.id}</span></Card.Title>
                <div className='p-3'>
                    <Row>
                        <Col>
                            <strong>Bills To: </strong>{props.bills}
                            <br />
                            <strong>Date: </strong>{props.date}
                            <br />
                            <strong>PO Number: </strong>{props.po_number}
                        </Col>
                        <Col>
                            <strong>Due Date: </strong>{props.due_date}
                            <br />
                            <strong>Payment Terms: </strong>{props.payment_terms}
                            <br />
                            <strong>Amount Paid: </strong>{props.amount_paid} {props.currency}
                            <br />
                        </Col>
                        <Col>
                            <strong>Discount: </strong>{props.discount} %
                            <br />
                            <strong>Tax: </strong>{props.tax} %
                            <br />
                            <strong>Balance Due: </strong>{props.balance_due} {props.currency}
                            <br />
                        </Col>
                    </Row>
                </div>
                {/* <Button
                    variant="success"
                    className='m-2'
                ><Icon path={mdiDownload} size={1} /> Download Invoice</Button>{' '}
                <Button
                    variant="primary"
                    className='m-2'
                ><Icon path={mdiPrinter} size={1} /> Print Invoice</Button>{' '} */}
            </Card.Body>
        </Card>
    );
}

export default InvoiceCard;