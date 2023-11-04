import { makeAutoObservable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";
import axios from "axios";
import settings from "./settingsStore";
import { flask_url } from "./urls";

class InvoiceStore {
  invoices = [];
  currentPage = 1;
  total_invoices = 0;
  totalPages = 1;
  itemsPerPage = 2;
  finished = false;

  constructor() {
    makeAutoObservable(this,{
        loadInvoices:action,
        setInvoices:action,
        setCurrentPage:action,
        setFinished:action,
    });
  }

  async loadInvoices() {
    try {
      const response = await axios.post(`${flask_url}/invoice`, {
        page: this.currentPage,
        invoice_per_page: this.itemsPerPage,
        user_token: settings.getUserToken(),
      });

      if (response.data && response.data.invoices_data) {
        const newInvoices = response.data.invoices_data;
        if (this.invoices.length < this.total_invoices){
            this.setInvoices(this.invoices.concat(newInvoices))
            this.setCurrentPage(this.currentPage+1)
        } else{
            this.setFinished(true)
        }
        this.total_invoices = response.data.total_invoices;
        this.totalPages = response.data.total_pages;
      }
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  }

  setInvoices(invoices) {
    this.invoices = invoices;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  setFinished(finished) {
    this.finished = finished;
  }

  getFinished() {
    return this.finished;
  }
}

const invoiceStore = new InvoiceStore();
export default invoiceStore;
