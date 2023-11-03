from peewee import Model, CharField, FloatField, IntegerField, ForeignKeyField, SqliteDatabase, DateTimeField, DateField
import datetime
import os


db = SqliteDatabase('./database.db')


class Invoice(Model):
    id = CharField(primary_key=True)
    user = CharField()
    company = CharField()
    logo = CharField(null=True)
    date = DateField()
    payment_terms = CharField()
    due_date = CharField()
    po_number = CharField()
    bills = CharField()
    ships = CharField()
    tax = FloatField()
    discount = FloatField()
    shipping = FloatField()
    amount_paid = FloatField()
    currency = CharField()
    created_at = DateTimeField(default=datetime.datetime.now)
    amount_due = FloatField()

    class Meta:
        database = db


class Item(Model):
    description = CharField()
    rate = FloatField()
    quantity = IntegerField()
    invoices = ForeignKeyField(Invoice, backref='invoices')

    class Meta:
        database = db


def create_invoice(id, user, company, logo, date, payment_terms, due_date, po_number, bills, ships, tax, discount, shipping, amount_paid, currency, items, amount_due):
    invoice = Invoice.create(
        id=id,
        user=user,
        company=company,
        logo=logo,
        date=date,
        payment_terms=payment_terms,
        due_date=due_date,
        po_number=po_number,
        bills=bills,
        ships=ships,
        tax=tax,
        discount=discount,
        shipping=shipping,
        amount_paid=amount_paid,
        currency=currency,
        amount_due=amount_due,
    )
    for item in items:
        Item.create(description=item["description"], rate=item["rate"],
                    quantity=item["quantity"], invoices=invoice)
    return invoice


def get_invoices(user=None):
    query = Invoice.select()

    if user:
        query = query.where(
            (Invoice.user == user)
        )

    return query


def get_invoices_paginated(page, items_per_page, user=None):
    query = get_invoices(user)
    total_invoices = query.count()
    total_pages = (total_invoices + items_per_page - 1) // items_per_page
    if page < 1:
        page = 1
    elif page > total_pages:
        page = total_pages
    start_index = (page - 1) * items_per_page
    end_index = min(start_index + items_per_page, total_invoices)
    invoices = query.offset(start_index).limit(items_per_page)
    invoices_data = []
    for invoice in invoices:
        invoice_dict = {
            "id": invoice.id,
            "user": invoice.user,
            "company": invoice.company,
            "logo": invoice.logo,
            "date": invoice.date,
            "payment_terms": invoice.payment_terms,
            "due_date": invoice.due_date,
            "po_number": invoice.po_number,
            "bills": invoice.bills,
            "ships": invoice.ships,
            "tax": invoice.tax,
            "discount": invoice.discount,
            "shipping": invoice.shipping,
            "amount_paid": invoice.amount_paid,
            "currency": invoice.currency,
            "created_at": invoice.created_at,
            "amount_due": invoice.amount_due,
        }
        invoices_data.append(invoice_dict)
    return {
        "invoices_data": invoices_data,
        "total_invoices": total_invoices,
        "total_pages": total_pages,
        "current_page": page,
    }


def get_invoice_by_id(id):
    return Invoice.get(Invoice.id == id)


# def update_invoice(id,user, company, logo, date, payment_terms, due_date, po_number, bills, ships, tax, discount, shipping, amount_paid, currency):
#     invoice = get_invoice_by_id(id)
#     invoice.company = company
#     invoice.logo = logo
#     invoice.date = date
#     invoice.payment_terms = payment_terms
#     invoice.due_date = due_date
#     invoice.po_number = po_number
#     invoice.bills = bills
#     invoice.ships = ships
#     invoice.tax = tax
#     invoice.discount = discount
#     invoice.shipping = shipping
#     invoice.amount_paid = amount_paid
#     invoice.currency = currency
#     invoice.save()


def delete_invoice(id):
    invoice = get_invoice_by_id(id)
    invoice.delete_instance()


if not os.path.exists("./database.db"):
    db.connect()
    db.create_tables([Invoice, Item])
