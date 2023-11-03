import { makeAutoObservable, action, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";
import axios from "axios";
import { flask_url } from "./urls";

class Settings {
  user_token = "";
  auto_save = true;
  check = true;
  dev = false;

  constructor() {
    makeAutoObservable(this, {
      setUserToken: action,
      toggleAutoSave: action,
      toggleCheck: action,
      toggleDev: action,
    });
    makePersistable(this, {
      name: "settings",
      properties: ["user_token","auto_save", "check", "dev"],
      storage: window.localStorage,
    });
  }

  async initializeUser() {
      try {
        const response = await axios.get(`${flask_url}/get_token`);
        const data = response.data;
        this.setUserToken(data.token);
      } catch (error) {
        console.error("Failed to fetch user token:", error);
    }
  }

  setUserToken(token) {
    this.user_token = token;
  }

  toggleAutoSave() {
    this.auto_save = !this.auto_save;
  }

  toggleCheck() {
    this.check = !this.check;
  }

  toggleDev() {
    this.dev = !this.dev;
    this.check = true;
    this.auto_save = true;
  }

  getAutoSave() {
    return this.auto_save;
  }

  getCheck() {
    return this.check;
  }

  getDev() {
    return this.dev;
  }

  getUserToken() {
    return this.user_token;
  }
}

const settings = new Settings();
export default settings;
