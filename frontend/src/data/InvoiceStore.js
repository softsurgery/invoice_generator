import { makeAutoObservable, action, computed } from "mobx";
import { makePersistable } from 'mobx-persist-store';

class InvoiceStore {
    auto = -1
    id = 0
    company = ""
    date = ""
    payement_terms = ""
    due_date = ""
    po_number = ""
    bills = ""
    ships = ""
    items = [this.createItem()]
    tax = 0
    discount = 0
    shipping = 0
    amount_paid = 0

    constructor() {
        makeAutoObservable(this, {
            setId: action,
            setCompany: action,
            setDate: action,
            setPaymentTerms: action,
            setDueDate: action,
            setPONumber: action,
            setBills: action,
            setShips: action
        });
    }

    setId(id) {
        this.id = id;
    }

    setCompany(company) {
        this.company = company;
    }

    setDate(date) {
        this.date = date;
    }

    setPaymentTerms(paymentTerms) {
        this.payment_terms = paymentTerms;
    }

    setDueDate(dueDate) {
        this.due_date = dueDate;
    }

    setPONumber(poNumber) {
        this.po_number = poNumber;
    }

    setBills(bills) {
        this.bills = bills;
    }

    setShips(ships) {
        this.ships = ships;
    }

    setItems(items) {
        this.items = items;
    }

    setTax(tax) {
        this.tax = tax;
    }

    setDiscount(discount) {
        this.discount = discount;
    }

    setShipping(shipping) {
        this.shipping = shipping;
    }

    setAmountPaid(amount_paid) {
        this.amount_paid = amount_paid;
    }

    getId() {
        return this.id;
    }

    getCompany() {
        return this.company;
    }

    getDate() {
        return this.date;
    }

    getPaymentTerms() {
        return this.payment_terms;
    }

    getDueDate() {
        return this.due_date;
    }

    getPONumber() {
        return this.po_number;
    }

    getBills() {
        return this.bills;
    }

    getShips() {
        return this.ships;
    }

    getItems() {
        return this.items;
    }

    getTax() {
        return this.tax;
    }

    getDiscount() {
        return this.discount;
    }

    getShipping(){
        return this.shipping;
    }

    getAmountPaid(){
        return this.amount_paid;
    }

    createItem(index = 0) {
        this.auto++;
        return {
            id: index==0 ? index : this.auto,
            description: "",
            quantity: 0,
            rate: 0,
        }
    }

    addItem() {
        this.items.push(this.createItem(this.items.length));
    }

    updateItem(id, key, value) {
        const indexToUpdate = this.items.findIndex(item => item.id === id);
        this.items[indexToUpdate][key] = value;
    }

    deleteItem(id) {
        const indexToDelete = this.items.findIndex(item => item.id === id);
        if (indexToDelete !== -1) {
            this.items.splice(indexToDelete, 1);
        }
    }

    clearFirstItem(){
        this.items[0] = this.createItem();
    }

    sum(){
        let sum = 0;
        this.items.forEach(item => {
            sum += item.quantity * item.rate;
        });
        return sum;
    }

    getTTC(){
        return this.sum() * (1 + Number(this.tax-this.discount)/100) + Number(this.shipping)
    }

    getBalanceDue(){
        return this.getTTC() - this.amount_paid
    }

}

const invoiceStore = new InvoiceStore();
export default invoiceStore;
