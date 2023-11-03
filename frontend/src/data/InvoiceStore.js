import { makeAutoObservable, action } from "mobx";
import { makePersistable } from "mobx-persist-store";
import axios from "axios";
import settings from "./settingsStore";
import { flask_url } from "./urls";

class InvoiceStore {
  invoices = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  constructor() {
    makeAutoObservable(this, {
      loadInvoices: action,
      setInvoices: action,
      setCurrentPage: action,
    });
  }

  async loadInvoices(page, itemsPerPage) {
    try {
      const response = await axios.post(`${flask_url}/invoice`, {
        page: page,
        invoice_per_page: itemsPerPage,
        user_token: settings.getUserToken(),
      });

      if (response.data && response.data.invoices_data) {
        this.extendInvoices(response.data.invoices_data);
        this.currentPage = page;
        this.totalPages = response.data.total_pages;
      }
    } catch (error) {
      console.error("Error loading invoices:", error);
    }
  }

  setInvoices(invoices) { 
    this.invoices = invoices;
  }

  extendInvoices(invoices) {
    this.invoices = this.invoices.concat(invoices);
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }
}

const invoiceStore = new InvoiceStore();
export default invoiceStore;
