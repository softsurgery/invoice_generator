import { makeAutoObservable, action, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";


class Settings {
    auto_save = false;
    check = false;
    dev = false;

    constructor(){
        makeAutoObservable(this,{
            toggleAutoSave:action,
            toggleCheck:action,
            toggleDev:action,
        })
        makePersistable(this, {name: 'settings', properties: ['auto_save','check',"dev"], storage: window.localStorage});
    }

    toggleAutoSave(){
        this.auto_save = ! (this.auto_save);
    }

    toggleCheck(){
        this.check = ! (this.check);
    }

    toggleDev(){
        this.dev = ! (this.dev);
    }

    getAutoSave(){
        return this.auto_save;
    }

    getCheck(){
        return this.check;
    }

    getDev(){
        return this.dev;
    }
}

const settings = new Settings();
export default settings;