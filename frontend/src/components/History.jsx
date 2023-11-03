import Container from "react-bootstrap/esm/Container";
import invoiceStore from "../data/InvoiceStore";
import { observer } from "mobx-react";
import InvoiceCard from "./InvoiceCard";
import React, { useEffect, useState } from "react";

const History = observer(() => {
    const [page,setPage] = useState(1);

    const handleLoad = () => {
        invoiceStore.loadInvoices(page+1,2);
        setPage(page+1);
        console.log(page)
    }

    return (
        <Container fluid>
            <h1>History</h1>
            <hr />
            <div className="p-1 m-4">
                {invoiceStore.invoices.map(invoice => (
                    <InvoiceCard
                        key={invoice.id}
                        id={invoice.id}
                        bills={invoice.bills}
                        date={invoice.date}
                        due_date={invoice.due_date}
                        po_number={invoice.po_number}
                        tax={invoice.tax}
                        amount_paid={invoice.amount_paid}
                        payment_terms={invoice.payment_terms}
                        shipping={invoice.shipping}
                        balance_due={invoice.amount_due}
                        discount={invoice.discount}
                        currency={invoice.currency}
                    />
                ))}
            </div>
            <div className="text-center">
                <h3 className="">  
                <a href="#bottom"
                onClick={handleLoad}
                >Load More...</a></h3>
            </div>
            <span id="bottom"></span>
        </Container>
    );
});

export default History;
