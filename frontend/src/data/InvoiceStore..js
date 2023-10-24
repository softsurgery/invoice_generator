import { makeAutoObservable, action } from "mobx";
import { makePersistable } from 'mobx-persist-store';

class InvoiceStore {
    id = 0 
    company = ""
    date = new Date()
    payement_terms = ""
    due_date = new Date()
    po_number = 0

    constructor() {
        makeAutoObservable(this)
    }
}

const invoiceStore = new InvoiceStore();
export default invoiceStore;
