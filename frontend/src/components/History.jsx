import Container from "react-bootstrap/esm/Container";
import invoiceStore from "../data/InvoiceStore";
import { observer } from "mobx-react";
import InvoiceCard from "./InvoiceCard";
import React, { useEffect, useState } from "react";

const History = observer(() => {

    useEffect(() => {
        invoiceStore.loadInvoices();
    }, [])

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
                {!invoiceStore.getFinished() ? (
                    <h4 className="">
                        <a href="#" onClick={() => invoiceStore.loadInvoices()}>Load More...</a>
                    </h4>
                ) : <h4 className="">
                    <a>There is nothing to show</a>
                </h4>}</div>
        </Container>
    );
});

export default History;

