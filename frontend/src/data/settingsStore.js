import { makeAutoObservable, action, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";
import axios from "axios";

class Settings {
  user_token = "";
  auto_save = false;
  check = false;
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
        const response = await axios.get("http://127.0.0.1:5001/get_token");
        const data = response.data;
        this.setUserToken(data.token);
      } catch (error) {
        console.error("Failed to fetch user token:", error);
    }
  }

  setUserToken(token) {
    this.user_token = token;
    console.log(this.user);
  }

  toggleAutoSave() {
    this.auto_save = !this.auto_save;
  }

  toggleCheck() {
    this.check = !this.check;
  }

  toggleDev() {
    this.dev = !this.dev;
    this.check = false;
    this.auto_save = false;
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
