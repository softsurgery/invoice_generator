import { makeAutoObservable, action, computed } from "mobx";
import { makePersistable } from 'mobx-persist-store';

class InvoiceStore {
    id = 0
    company = ""
    date = "12/05/2001"
    payement_terms = ""
    due_date = "null"
    po_number = 0
    bills = ""
    ships = ""
    items =[this.createItem()]

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

    createItem(index=0) {
        return {
            id : index,
            description:"",
            quantity:5,
            rate:0,
        }
    }

    updateItem(index=0,key,value){
        this.items[index][key] = value;
    }
}

const invoiceStore = new InvoiceStore();
export default invoiceStore;
