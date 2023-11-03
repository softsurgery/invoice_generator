import { observer } from "mobx-react"
import invoiceStore from "../data/InvoiceInstanceStore"
import settings from "../data/settingsStore"

const Footer = observer(() =>{
    return (
        <footer 
            className="page-footer text-center text-md-left pt-4"
            style={{opacity : settings.getDev() ? "" : "0"}}>
            <div className="footer text-center">
                <div className="container-fluid">
                    <a href="https://github.com/softsurgery" target="_blank"> @softsurgery </a> {new Date().getFullYear()} 
                </div>
            </div>
        </footer>
    )
})

export default Footer