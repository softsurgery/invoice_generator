import { makeAutoObservable, action, computed } from "mobx";
import axios from "axios";
import { makePersistable } from "mobx-persist-store";

class InvoiceStore {
  auto = -1;
  id = "";
  company = "";
  logo = undefined;
  date = "";
  payement_terms = "";
  due_date = "";
  po_number = "";
  bills = "";
  ships = "";
  items = [this.createItem()];
  tax = 0;
  discount = 0;
  shipping = 0;
  amount_paid = 0;
  currency = "USD $";

  constructor() {
    makeAutoObservable(this, {
      setId: action,
      setCompany: action,
      setDate: action,
      setPaymentTerms: action,
      setDueDate: action,
      setPONumber: action,
      setBills: action,
      setShips: action,
      setItems: action,
      setTax: action,
      setDiscount: action,
      setShipping: action,
      setAmountPaid: action,
    });
    makePersistable(this, {name: 'InvoiceStore', properties: ['currency'], storage: window.localStorage});
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

  setLogo(logo) {
    this.logo = logo;
  }

  setCurrency(currency) {
    this.currency = currency.toString();
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

  getShipping() {
    return this.shipping;
  }

  getAmountPaid() {
    return this.amount_paid;
  }

  getLogo() {
    return this.logo;
  }

  getCurrency(){
    return this.currency;
  }

  createItem(index = 0) {
    this.auto++;
    return {
      id: index == 0 ? index : this.auto,
      description: "",
      quantity: 0,
      rate: 0,
    };
  }

  addItem() {
    this.items.push(this.createItem(this.items.length));
  }

  updateItem(id, key, value) {
    const indexToUpdate = this.items.findIndex((item) => item.id === id);
    this.items[indexToUpdate][key] = value;
  }

  deleteItem(id) {
    const indexToDelete = this.items.findIndex((item) => item.id === id);
    if (indexToDelete !== -1) {
      this.items.splice(indexToDelete, 1);
    }
  }

  clearFirstItem() {
    this.items[0] = this.createItem();
  }

  sum() {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.quantity * item.rate;
    });
    return sum;
  }

  getTTC() {
    return (
      this.sum() * (1 + Number(this.tax - this.discount) / 100) +
      Number(this.shipping)
    );
  }

  getBalanceDue() {
    return this.getTTC() - this.amount_paid;
  }

  collectData(){
    return {
      id: this.getId(),
      company: this.getCompany(),
      date: this.getDate(),
      payment_terms: this.getPaymentTerms(),
      due_date: this.getDueDate(),
      po_number: this.getPONumber(),
      bills: this.getBills(),
      ships: this.getShips(),
      items: JSON.stringify(this.getItems()),
      tax: this.getTax(),
      discount: this.getDiscount(),
      shipping: this.getShipping(),
      amount_paid: this.getAmountPaid(),
      logo: this.getLogo(),
      total_ht: this.sum().toFixed(2),
      total_ttc: this.getTTC().toFixed(2),
      balance_due:this.getBalanceDue().toFixed(2),
      currency: this.getCurrency()
    };
  }

  print() {
    axios.post("http://127.0.0.1:5001/print", this.collectData(), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Server response:", response.data);
      
      const redirectURL = response.data.redirectURL;
      
      if (redirectURL) {
        window.open(redirectURL, "_blank");
      }
    })
    .catch((error) => {
      console.error("Error sending data to the server:", error);
    });
  }

  download(){
    axios.post("http://127.0.0.1:5001/download", this.collectData(), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Server response:", response.data);
      
      const redirectURL = response.data.redirectURL;
      
      if (redirectURL) {
        window.open(redirectURL, "_blank");
      }
    })
    .catch((error) => {
      console.error("Error sending data to the server:", error);
    });
  }

  generateRandomId() {
    const timestamp = Number(new Date().getTime());
    const randomPart = Math.floor(Math.random() * 10000);
    this.setId(`${timestamp}-${randomPart}`);
  }
}

const invoiceStore = new InvoiceStore();
export default invoiceStore;
