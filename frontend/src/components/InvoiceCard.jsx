import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Icon from '@mdi/react';
import { mdiDownload } from '@mdi/js';
import { mdiPrinter } from '@mdi/js';
import { mdiReload } from '@mdi/js';

function InvoiceCard(props) {
    return (

        <Card className="mt-4" style={{ width: '90%' }}>
            <Card.Header>{props.id}</Card.Header>
            <Card.Body>
                <Card.Title>Invoice : {props.id}</Card.Title>
                <Card.Text className='mt-4'>
                    <Row>

                        <Col>
                            <strong>Bills To: </strong>{props.bills_to}
                            <br />
                            <strong>Date: </strong>{props.bills_to}
                            <br />
                            <strong>PO Number: </strong>{props.bills_to}
                        </Col>
                        <Col>
                            <strong>Due Date: </strong>{props.bills_to}
                            <br />
                            <strong>Payement Terms: </strong>{props.bills_to}
                            <br />
                            <strong>Amount Paid: </strong>{props.bills_to}
                            <br />
                        </Col>
                        <Col>

                            <strong>Discount: </strong>{props.bills_to}
                            <br />
                            <strong>Tax: </strong>{props.bills_to}
                            <br />
                            <strong>Balance Due: </strong>{props.bills_to}
                            <br />
                        </Col>

                    </Row>

                </Card.Text>
                <Button
                    variant="warning"
                    className='m-2'
                ><Icon path={mdiReload} size={1} /> Reuse Invoice</Button>{' '}
                <Button
                    variant="success"
                    className='m-2'
                ><Icon path={mdiDownload} size={1} /> Download Invoice</Button>{' '}
                <Button
                    variant="primary"
                    className='m-2'
                ><Icon path={mdiPrinter} size={1} /> Print Invoice</Button>{' '}

            </Card.Body>
        </Card>
    );
}

export default InvoiceCard;